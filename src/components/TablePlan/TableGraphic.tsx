import { useEffect, useMemo, useState } from 'react';
import { Layer, Rect, Text } from 'react-konva';
import { animate } from 'motion';

// Laudade graafiline komponent

type RestaurantTable = {
    id: number;
    seats: number;
    positionX: number;
    positionY: number;
    width: number;
    height: number;
    score: { // 0-150
        quietnessScore: number; // 0-50, kõrgem on vaiksem
        windowScore: number; // 0-50, kõrgem on aknale lähemal
        playAreaScore: number; // 0-50, kõrgem on laste mängualale lähemal
    };
};

export type SelectedTableInfo = {
  id: number;
  seats: number;
};

type TableGraphicProps = {
  stageWidth: number;
  stageHeight: number;
  takenTableIds: number[];
  partysize?: number | null;
  showSelectableTables?: boolean;
  comforts: string[];
  onSelectionChange?: (table: SelectedTableInfo | null) => void;
};

function TableGraphic({
  stageWidth,
  stageHeight,
  takenTableIds,
  partysize,
  showSelectableTables = false,
  comforts,
  onSelectionChange,
}: TableGraphicProps) {
  // Komponendi oleku haldamine
  const [tableData, setTableData] = useState<RestaurantTable[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hoveredTableId, setHoveredTableId] = useState<number | null>(null);
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const [pressedTableId, setPressedTableId] = useState<number | null>(null);
  const [pulseScale, setPulseScale] = useState(1);

  const scale = 1.12;
  const roomWidth = 600 * scale;
  const roomHeight = 600 * scale;
  const roomX = (stageWidth - roomWidth) / 2;
  const roomY = (stageHeight - roomHeight) / 2;
  const s = (value: number) => value * scale;

  // Valitud mugavuste tuvastamine
  const selectedComfortScores = useMemo(() => {
    return comforts.flatMap((comfort) => {
      if (comfort === 'quiet' || comfort === 'quietness') {
        return ['quietnessScore'] as const;
      }

      if (comfort === 'window') {
        return ['windowScore'] as const;
      }

      if (comfort === 'playarea') {
        return ['playAreaScore'] as const;
      }

      return [] as const;
    });
  }, [comforts]);

  // Laudade soovitamise algoritm valitud mugavuste põhjal
  // Vastavalt valikute hulgale liidetakse vastavad hulga elementide skoorid kokku ning 
  // võrreldakse neid dünaamiliselt arvutatud lävendiga.
  const recommendedBasedOnComfort = (table: RestaurantTable) => {
    if (!partysize || selectedComfortScores.length === 0) {
      return null;
    }

    const score = selectedComfortScores.reduce((sum, key) => sum + (table.score?.[key] ?? 0), 0);
    const maxScore = selectedComfortScores.length * 50;

    // Soovituste lävend: (1 mugavus = 25 punkti), (2 mugavust = 50 punkti), (3 mugavust = 100 punkti)
    let recommendationThreshold = 100;
    if (selectedComfortScores.length === 1) {
      recommendationThreshold = 25;
    } else if (selectedComfortScores.length === 2) {
      recommendationThreshold = 50;
    }

    return {
      score,
      maxScore,
      recommendationThreshold,
      isRecommended: score > recommendationThreshold,
    };
  };

  // Värvi gradiendi arvutamine soovituste skoori põhjal
  const mixChannel = (start: number, end: number, ratio: number) => {
    return Math.round(start + (end - start) * ratio);
  };

  // Soovituste värv muutub gradiendi järgi vastavalt skoorile
  const getRecommendationColors = (score: number, threshold: number, maxScore: number) => {
    const normalized = Math.min(1, Math.max(0, (score - threshold) / (maxScore - threshold)));
    const fill = `rgb(${mixChannel(220, 34, normalized)}, ${mixChannel(252, 197, normalized)}, ${mixChannel(231, 94, normalized)})`;
    const stroke = `rgb(${mixChannel(134, 21, normalized)}, ${mixChannel(239, 128, normalized)}, ${mixChannel(172, 61, normalized)})`;

    return { fill, stroke };
  };

  // Laudade interaktiivsuse ja pulseerimise haldamine
  useEffect(() => {
    if (!showSelectableTables) {
      setHoveredTableId(null);
      setSelectedTableId(null);
      setPressedTableId(null);
      setPulseScale(1);
      return;
    }

    // Pulseeriv animatsioon
    const pulseAnimation = animate(0, 1, {
      duration: 1.05,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
      onUpdate: (value) => {
        setPulseScale(1 + value * 0.1);
      },
    });

    return () => pulseAnimation.stop();
  }, [showSelectableTables]);

  // get-meetod laudade andmete laadimiseks backendist
  useEffect(() => {
    const loadTables = async () => {
      try {
        const response = await fetch('/api/tables');

        if (!response.ok) {
          throw new Error(`Failed to fetch tables: ${response.status}`);
        }

        const payload = (await response.json()) as RestaurantTable[];
        setTableData(payload);
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : 'Unknown error');
      }
    };

    loadTables();
  }, []);

  // Laudade ID-de kogum, mis on broneeritud külaliskonna suuruse tõttu liiga sobimatud, et soovitada
  const blockedByPartyRuleTableIds = useMemo(() => {
    if (!partysize) {
      return new Set<number>();
    }

    const availableFittingTables = tableData.filter(
      (table) => table.seats >= partysize && !takenTableIds.includes(table.id),
    );

    const blockedIds = new Set<number>();

    // 1-2 külalist: ei soovitata 4- ja 6-kohalisi laudu, kui on olemas sobivaid väiksemaid laudu
    if (partysize === 1 || partysize === 2) {
      const hasPreferredSmallTable = availableFittingTables.some(
        (table) => table.seats !== 4 && table.seats !== 6,
      );
      const hasAvailableFourSeatTable = availableFittingTables.some((table) => table.seats === 4);

      availableFittingTables.forEach((table) => {
        if (table.seats === 4 && hasPreferredSmallTable) {
          blockedIds.add(table.id);
        }

        if (table.seats === 6 && (hasPreferredSmallTable || hasAvailableFourSeatTable)) {
          blockedIds.add(table.id);
        }
      });
    }

    // 3 külalist: ei soovitata 6-kohalisi laudu, kui on olemas sobivaid väiksemaid laudu
    if (partysize === 3) {
      const hasAvailableNonSixSeatTable = availableFittingTables.some((table) => table.seats !== 6);

      if (hasAvailableNonSixSeatTable) {
        availableFittingTables.forEach((table) => {
          if (table.seats === 6) {
            blockedIds.add(table.id);
          }
        });
      }
    }

    return blockedIds;
  }, [tableData, partysize, takenTableIds]);

  // Valiku muutumise teavitamine vanemkomponendile
  useEffect(() => {
    if (!onSelectionChange) {
      return;
    }

    // Kui lauad ei ole valitavad, siis tühjendame valiku
    if (!showSelectableTables || !selectedTableId || !partysize) {
      onSelectionChange(null);
      return;
    }

    const selectedTable = tableData.find((table) => table.id === selectedTableId);

    if (!selectedTable) {
      onSelectionChange(null);
      return;
    }

    // Laud loetakse sobimatuks, kui selle kohtade arv on väiksem kui külaliskonna suurus, kui laud on hõivatud või kui laud on blokeeritud külaliskonna suuruse tõttu
    const isUnavailable =
      selectedTable.seats < partysize
      || takenTableIds.includes(selectedTable.id)
      || blockedByPartyRuleTableIds.has(selectedTable.id);

    if (isUnavailable) {
      onSelectionChange(null);
      return;
    }

    onSelectionChange({
      id: selectedTable.id,
      seats: selectedTable.seats,
    });
  }, [
    blockedByPartyRuleTableIds,
    onSelectionChange,
    partysize,
    selectedTableId,
    showSelectableTables,
    tableData,
    takenTableIds,
  ]);

  return (
    <Layer>
      {/* Laudade kuvamine: roheline on saadaval, punane on hõivatud */}
      {tableData.map((table) => {
        const tableWidth = table.width;
        const tableHeight = table.height;
        const tableX = roomX + table.positionX;
        const tableY = roomY + table.positionY;
        const isTaken = takenTableIds.includes(table.id);
        const canFitParty = partysize ? table.seats >= partysize : true;
        const isBlockedByPartyRule = blockedByPartyRuleTableIds.has(table.id);

        return (
          <Rect
            key={table.id}
            x={tableX}
            y={tableY}
            width={tableWidth}
            height={tableHeight}
            fill={isTaken ? "#fca5a5" : canFitParty && !isBlockedByPartyRule ? "#89adaa" : '#fed7aa'}
            cornerRadius={s(10)}
            stroke="#1f2937"
            strokeWidth={s(1.3)}
            shadowColor="#000"
            shadowBlur={s(4)}
            shadowOpacity={0.2}
            shadowOffsetY={s(1)}
          />
        );
      })}

      {/* Soovitatud laudade interaktiivne overlay */}
      {tableData.map((table) => {
        const tableWidth = table.width;
        const tableHeight = table.height;
        const tableX = roomX + table.positionX;
        const tableY = roomY + table.positionY;
        const recommendation = recommendedBasedOnComfort(table);
        const isBlockedByPartyRule = blockedByPartyRuleTableIds.has(table.id);

        // Liiga suur külaliskond, laud on hoivatud - lauda ei soovitata.
        if (
          !showSelectableTables
          || !partysize
          || table.seats < partysize
          || takenTableIds.includes(table.id)
          || isBlockedByPartyRule
        ) {
          return null;
        }

        // Kui on valitud mugavused, kuid selle jargi soovitusi ei ole - lauda ei soovitata.
        if (selectedComfortScores.length > 0 && !recommendation?.isRecommended) {
          return null;
        }

        const recommendationColors = recommendation
          ? getRecommendationColors(
              recommendation.score,
              recommendation.recommendationThreshold,
              recommendation.maxScore,
            )
          : { fill: '#86efac', stroke: '#66be1d' };
        const isHovered = hoveredTableId === table.id;
        const isSelected = selectedTableId === table.id;
        const isPressed = pressedTableId === table.id;
        const baseOverlayScale = isSelected || isHovered ? 1.08 : pulseScale;
        const pressedScale = Math.max(1.01, baseOverlayScale - 0.05);
        const scaleFactor = isPressed ? pressedScale : baseOverlayScale;
        const scaledWidth = tableWidth * scaleFactor;
        const scaledHeight = tableHeight * scaleFactor;
        const scaledX = tableX - (scaledWidth - tableWidth) / 2;
        const scaledY = tableY - (scaledHeight - tableHeight) / 2;
        const overlayColors = isSelected
          ? { fill: '#facc15', stroke: '#ca8a04' }
          : recommendationColors;

        return (
            <Rect
            key={table.id}
            x={scaledX}
            y={scaledY}
            width={scaledWidth}
            height={scaledHeight}
            fill={overlayColors.fill}
            cornerRadius={s(10)}
            stroke={overlayColors.stroke}
            strokeWidth={s(4)}
            shadowColor="#000"
            shadowBlur={s(4)}
            shadowOpacity={0.2}
            shadowOffsetY={s(1)}
            onMouseEnter={(event) => {
              setHoveredTableId(table.id);
              event.target.getStage()?.container().style.setProperty('cursor', 'pointer');
            }}
            onMouseLeave={(event) => {
              setPressedTableId((currentId) => (currentId === table.id ? null : currentId));
              setHoveredTableId((currentId) => (currentId === table.id ? null : currentId));
              event.target.getStage()?.container().style.setProperty('cursor', 'default');
            }}
            onMouseDown={() => setPressedTableId(table.id)}
            onMouseUp={() => setPressedTableId((currentId) => (currentId === table.id ? null : currentId))}
            onTouchStart={() => setPressedTableId(table.id)}
            onTouchEnd={() => setPressedTableId((currentId) => (currentId === table.id ? null : currentId))}
            onClick={() => setSelectedTableId(table.id)}
            onTap={() => setSelectedTableId(table.id)}
          />
        );      
      })}

      {/* Laudade kohtade arv */}
      {tableData.map((table) => {
        const tableWidth = table.width;
        const tableHeight = table.height;
        const tableX = roomX + table.positionX;
        const tableY = roomY + table.positionY;

        return (
          <Text
            key={table.id}
            x={tableX}
            y={tableY + tableHeight / 2 - s(8)}
            width={tableWidth}
            align="center"
            text={`${table.seats}`}
            fontSize={s(14)}
            fontStyle="bold"
            fill="#111827"
          />
        );
      })}

      {/* Vea kuvamine laudade kuvamise ebaõnnestumise korral */}
      {error && (
        <Text
          text={`Table API error: ${error}`}
          x={roomX + s(20)}
          y={roomY + roomHeight - s(90)}
          fontSize={s(14)}
          fill="#b91c1c"
        />
      )}
    </Layer>
  );
}

export default TableGraphic;
