import { useEffect, useState } from 'react';
import { Layer, Rect, Text } from 'react-konva';

type RestaurantTable = {
    id: number;
    seats: number;
    zone: string;
    position: number;
    positionX: number;
    positionY: number;
    width: number;
    height: number;
};

type TableGraphicProps = {
  stageWidth: number;
  stageHeight: number;
};

function TableGraphic({ stageWidth, stageHeight }: TableGraphicProps) {
  const [tableData, setTableData] = useState<RestaurantTable[]>([]);
  const [error, setError] = useState<string | null>(null);

  const scale = 1.12;
  const roomWidth = 600 * scale;
  const roomHeight = 600 * scale;
  const roomX = (stageWidth - roomWidth) / 2;
  const roomY = (stageHeight - roomHeight) / 2;
  const s = (value: number) => value * scale;

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

  return (
    <Layer>
      {tableData.map((table) => {
        const tableWidth = table.width;
        const tableHeight = table.height;
        const tableX = roomX + table.positionX;
        const tableY = roomY + table.positionY;

        return (
          <Rect
            key={table.id}
            x={tableX}
            y={tableY}
            width={tableWidth}
            height={tableHeight}
            fill={"#86efac"}
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

      {tableData.map((table) => {
        const tableWidth = table.width;
        const tableHeight = table.height;
        const tableX = roomX + table.positionX;
        const tableY = roomY + table.positionY;

        return (
          <Text
            key={`label-${table.id}`}
            x={tableX}
            y={tableY + tableHeight / 2 - s(8)}
            width={tableWidth}
            align="center"
            text={`${table.seats}`}
            fontSize={s(14)}
            fill="#111827"
          />
        );
      })}

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
