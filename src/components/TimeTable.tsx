import Select from "react-select";
import { useEffect, useMemo, useState } from "react";
import type { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";

// Aja valimise komponent (modal), mis võimaldab kasutajal valida broneeringu kuupäeva ja kellaaega

type Reservation = {
  id: number;
  tableId: number;
  startTime: string;
  endTime: string;
  partySize: number;
};

type Option = { value: string; label: string };
type AvailableTimes = Record<string, string[]>;

type TimeTableProps = {
  selectedDate: Dayjs | null;
  onSelectedDateChange: (d: Dayjs | null) => void;
  availableTimes: AvailableTimes;
  reservations: Reservation[];
  loading: boolean;
  selectedTime: string | null;
  onSelectedTimeChange: (t: string | null) => void;
  onDialogOpenChange?: (isOpen: boolean) => void;
};

function TimeTable({
  selectedDate,
  onSelectedDateChange,
  availableTimes,
  reservations: _reservations,
  loading,
  selectedTime,
  onSelectedTimeChange,
  onDialogOpenChange,
}: TimeTableProps) {
  // Komponendi oleku haldamine
  const [isTimeTableOpen, setIsTimeTableOpen] = useState(true);

  // Dialoogi avamise ja sulgemise teavitamine vanemkomponendile
  useEffect(() => {
    onDialogOpenChange?.(isTimeTableOpen);
  }, [isTimeTableOpen, onDialogOpenChange]);

  // Ajavalikute genereerimine dropdown menüüse valitud kuupäeva põhjal
  const timeOptions = useMemo<Option[]>(() => {
    if (!selectedDate) return [];

    const dateKey = selectedDate.format("YYYY-MM-DD");
    const baseTimes = availableTimes[dateKey] ?? [];

    return baseTimes.map((t) => ({ value: t, label: t }));
  }, [selectedDate, availableTimes]);

  // Valitud aja objekt
  const selectedOption = selectedTime
    ? { value: selectedTime, label: selectedTime }
    : null;

  return (
    <>
      {/* Nupp aja valimise dialoogi avamiseks */}
      <button type="button" onClick={() => setIsTimeTableOpen(true)}>
        Select time
      </button>

      {/* Aja valimise dialoog */}
      {isTimeTableOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Select time"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "grid",
            placeItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: "1rem",
              borderRadius: "8px",
              minWidth: "320px",
            }}
          >
            <h2 className="text-lg font-bold mb-4 !text-gray-800">Select date</h2>

            {/* Kalender (MUI) */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={selectedDate}
                onChange={(newValue) => {
                  onSelectedDateChange(newValue);
                  onSelectedTimeChange(null);
                }}
                minDate={dayjs().startOf("day")}
                maxDate={dayjs().add(3, "year").endOf("day")}
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: 2,
                  color: "#111827",
                  "& .MuiPickersCalendarHeader-label": { color: "#111827" },
                  "& .MuiDayCalendar-weekDayLabel": { color: "#374151" },
                  "& .MuiPickersDay-root": { color: "#111827" },
                  "& .MuiPickersDay-root.Mui-disabled": { color: "#9ca3af" },
                  "& .MuiPickersDay-root.Mui-selected": {
                    color: "#fff",
                    backgroundColor: "#2563eb",
                  },
                  "& .MuiPickersDay-root.Mui-selected:hover": {
                    backgroundColor: "#1d4ed8",
                  },
                  "& .MuiIconButton-root": { color: "#111827" },
                  "& .MuiSvgIcon-root": { color: "#111827" },
                  "& .MuiPickersYear-yearButton": { color: "#111827 !important" },
                  "& .MuiPickersYear-yearButton.Mui-selected": {
                    color: "#fff !important",
                    backgroundColor: "#2563eb",
                  },
                  "& .MuiPickersMonth-monthButton": { color: "#111827 !important" },
                  "& .MuiPickersMonth-monthButton.Mui-selected": {
                    color: "#fff !important",
                    backgroundColor: "#2563eb",
                  },
                }}
              />
            </LocalizationProvider>

            <h2 className="text-lg font-bold mb-4 !text-gray-800">Select time</h2>

            {/* Kellaaja valiku dropdown menüü */}
            <Select
              options={timeOptions}
              value={selectedOption}
              onChange={(opt) => onSelectedTimeChange(opt?.value ?? null)}
              isDisabled={!selectedDate || loading}
              placeholder={
                !selectedDate ? "Select a date first" : loading ? "Loading..." : "Select time"
              }
              styles={{ option: (base) => ({ ...base, color: "#000" }) }}
            />

            {/* Submit nupp kellaaja ja kuupäeva kinnitamiseks */}
            <div style={{ marginTop: "1rem", textAlign: "right" }}>
              <button type="button" onClick={() => setIsTimeTableOpen(false)}>
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default TimeTable;