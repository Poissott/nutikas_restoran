import { Stage } from "react-konva";
import { useEffect, useMemo, useState } from "react";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import RestaurantGraphic from "./RestaurantGraphic";
import TableGraphic, { type SelectedTableInfo } from "./TableGraphic";
import TimeTable from "../TimeTable";
import Select from "react-select";
import BookingConfirmation from "../BookingConfirmation";

// Restoraniplaani põhikomponent, mis kasutab React Konva't restorani ja laudade graafiliseks kuvamiseks

// Kõik kättesaadavad ajad, mida saab broneerida
const DEFAULT_TIMES = [
    "08:00", "08:15", "08:30", "08:45",
    "09:00", "09:15", "09:30", "09:45",
    "10:00", "10:15", "10:30", "10:45",
    "11:00", "11:15", "11:30", "11:45",
    "12:00", "12:15", "12:30", "12:45",
    "13:00", "13:15", "13:30", "13:45",
    "14:00", "14:15", "14:30", "14:45",
    "15:00", "15:15", "15:30", "15:45",
    "16:00", "16:15", "16:30", "16:45",
    "17:00", "17:15", "17:30", "17:45",
    "18:00", "18:15", "18:30", "18:45",
    "19:00", "19:15", "19:30", "19:45",
    "20:00", "20:15", "20:30", "20:45",
    "21:00", "21:15", "21:30", "21:45",
  ];

type AvailableTimes = Record<string, string[]>;

// Broneeringu tüübi (Reservation) definitsioon
type Reservation = {
  id: number;
  tableId: number;
  startTime: string;
  endTime: string;
  partySize: number;
};

// Aja teisendamine minutiteks, et lihtsustada broneeringute võrdlemist
function toMinutes(iso: string) {
  const [, time] = iso.split("T");
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function MainStage() {
  const stageWidth = 1400;
  const stageHeight = 800;

  // Komponendi oleku haldamine
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [partysize, setPartysize] = useState<number | null>(null);
  const [comforts, setComforts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isTimeTableOpen, setIsTimeTableOpen] = useState(true);
  const [selectedTable, setSelectedTable] = useState<SelectedTableInfo | null>(null);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

  useEffect(() => {
    if (!selectedDate) {
      setSelectedTime(null);
      setReservations([]);
      setSelectedTable(null);
      setIsBookingDialogOpen(false);
      return;
    }

    setSelectedTime(null);
    const dayKey = selectedDate.format("YYYY-MM-DD");

    // get-meetod broneeringute kuvamiseks valitud päeva põhjal
    (async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/reservations/${dayKey}`);
        if (!response.ok) throw new Error(`Failed: ${response.status}`);
        const data = (await response.json()) as Reservation[];
        setReservations(data);
      } catch {
        setReservations([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedDate]);

  // Eelnevalt broneeritud laudade ID-de arvutamine, et kuvada need graafikus hõivatud laudadena
  const takenTableIds = useMemo(() => {
    if (!selectedTime) return [];
    const [h, m] = selectedTime.split(":").map(Number);
    const selected = h * 60 + m;

    return reservations
      .filter((r) => {
        const start = toMinutes(r.startTime);
        const end = toMinutes(r.endTime);
        return selected >= start && selected < end;
      })
      .map((r) => r.tableId);
  }, [reservations, selectedTime]);

  // Vabade aegade defineerimine
  const availableTimes: AvailableTimes = useMemo(() => {
    if (!selectedDate) return {};
    const dateKey = selectedDate.format("YYYY-MM-DD");
    return { [dateKey]: DEFAULT_TIMES };
  }, [selectedDate]);

  useEffect(() => {
    if (!selectedTable) {
      setIsBookingDialogOpen(false);
    }
  }, [selectedTable]);

  // Broneeringu esitamise funktsioon, mis saadab POST-päringu serverile uue broneeringu loomiseks
  const submitBooking = async () => {
    if (!selectedTable || !selectedDate || !selectedTime || !partysize) {
      return;
    }

    // Broneeringu algus- ja lõpuaja arvutamine, eeldades 90-minutilist broneeringut (saab vajadusel muuta)
    const start = dayjs(`${selectedDate.format("YYYY-MM-DD")}T${selectedTime}`);
    const end = start.add(90, "minute");

    setIsSubmittingBooking(true);

    // POST-päring broneeringu loomiseks
    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tableId: selectedTable.id,
          startTime: start.format("YYYY-MM-DDTHH:mm"),
          endTime: end.format("YYYY-MM-DDTHH:mm"),
          partySize: partysize,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed: ${response.status}`);
      }

      // Pärast broneeringu edukat esitamist värskendatakse broneeringute nimekirja, et hõivatud lauad kajastuksid graafikus
      const dayKey = selectedDate.format("YYYY-MM-DD");
      const refreshed = await fetch(`/api/reservations/${dayKey}`);
      if (refreshed.ok) {
        const data = (await refreshed.json()) as Reservation[];
        setReservations(data);
      }

      setIsBookingDialogOpen(false);
      setSelectedTable(null);
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  // Elementide varjutamine, kui ajavaliku modal on avatud
  const controlPanelVisualState = isTimeTableOpen
    ? { opacity: 0.45, filter: "saturate(0.7)", transition: "opacity 120ms ease" }
    : { opacity: 1, filter: "none", transition: "opacity 120ms ease" };

  return (
    <div className="min-h-screen flex items-center justify-center overflow-auto">
      <div style={{ minWidth: stageWidth, minHeight: stageHeight, position: "relative" }}>
        {/* Restorani graafiline esitus */}
        <Stage width={stageWidth} height={stageHeight}>
          <RestaurantGraphic stageWidth={stageWidth} stageHeight={stageHeight} />
          {/* Lauad on esitatud eraldi */}
          <TableGraphic
            stageWidth={stageWidth}
            stageHeight={stageHeight}
            takenTableIds={takenTableIds}
            partysize={partysize}
            showSelectableTables={Boolean(selectedTime && partysize && !isTimeTableOpen)}
            comforts={comforts}
            onSelectionChange={setSelectedTable}
          />
        </Stage>

        {/* Kalendri ja ajavaliku modal */}
        <div style={{ position: "absolute", top: "1rem", left: "1rem", zIndex: 10 }}>
          <TimeTable
            selectedDate={selectedDate}
            onSelectedDateChange={setSelectedDate}
            availableTimes={availableTimes}
            reservations={reservations}
            loading={loading}
            selectedTime={selectedTime}
            onSelectedTimeChange={setSelectedTime}
            onDialogOpenChange={setIsTimeTableOpen}
          />
        </div>

        {/* Drop-down menu külaliste arvu valimiseks */}
        <div style={{ position: "absolute", top: "5rem", left: "1rem", zIndex: 20, ...controlPanelVisualState }}>
          <p style={{ marginBottom: "0.5rem", color: "#2e2e2e", fontWeight: "bold", fontSize: "1.1rem" }}>
            Select the amount of guests:
          </p>
          {selectedDate && selectedTime && !isTimeTableOpen ? (
            <Select
            options={[
              { value: "partysize1", label: "1" },
              { value: "partysize2", label: "2" },
              { value: "partysize3", label: "3" },
              { value: "partysize4", label: "4" },
              { value: "partysize5", label: "5" },
              { value: "partysize6", label: "6" }
            ]}
            styles={{
              option: (base) => ({ ...base, color: "#000" }),
              menu: (base) => ({ ...base, zIndex: 100 }),
            }}
            onChange={(option) => setPartysize(Number(option?.value?.replace("partysize", "")))}
            placeholder=""
          />
          ) : (
            <Select
              options={[]}
              placeholder={isTimeTableOpen ? "Click Submit in timetable first" : "Select date and time first"}
              isDisabled
              styles={{
                placeholder: (base) => ({ ...base, color: "#888" }),
              }}
            />
          )}
        </div>

        {/* Drop-down menu eelistatud mugavuste valimiseks */}
        <div style={{ position: "absolute", top: "11rem", left: "1rem", zIndex: 10, isolation: "isolate", ...controlPanelVisualState }}>
          <p style={{ marginBottom: "0.5rem", color: "#2e2e2e", fontWeight: "bold", fontSize: "1.1rem" }}>
            Select your comforts:
          </p>
          {selectedDate && selectedTime && !isTimeTableOpen ? (
            <Select
            options={[
              { value: "quietness", label: "Quiet Corner" },
              { value: "window", label: "At Window" },
              { value: "playarea", label: "Play Area (Kids)" },
            ]}
            isMulti
            styles={{
              option: (base) => ({ ...base, color: "#000" }),
              container: (base) => ({ ...base, width: "200px" }),
              valueContainer: (base) => ({
                ...base,
                flexWrap: "wrap",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "2px",
                marginTop: "0.5rem",
              }),
            }}
            onChange={ (options) => setComforts(options.map(o => o.value)) }
            placeholder=""
          />
          ) : (
            <Select
              options={[]}
              placeholder={isTimeTableOpen ? "Click Submit in timetable first" : "Select date and time first"}
              isDisabled
              styles={{
                placeholder: (base) => ({ ...base, color: "#888" }),
                container: (base) => ({ ...base, width: "200px" }),
              }}
            />  
          )}
        </div>

        <BookingConfirmation
          canConfirm={Boolean(selectedTable)}
          isDisabled={isTimeTableOpen}
          isOpen={isBookingDialogOpen}
          isSubmitting={isSubmittingBooking}
          selectedTableId={selectedTable?.id ?? null}
          selectedDate={selectedDate ? selectedDate.format("YYYY-MM-DD") : null}
          selectedTime={selectedTime}
          partySize={partysize}
          onOpen={() => setIsBookingDialogOpen(true)}
          onClose={() => setIsBookingDialogOpen(false)}
          onSubmit={submitBooking}
        />
      </div>
    </div>
  );
}

export default MainStage;