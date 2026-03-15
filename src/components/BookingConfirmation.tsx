// Broneeringu kinnitamise dialoogi komponent, mis kuvab ülevaate valikust ja võimaldab broneeringut esitada

type BookingConfirmationProps = {
  canConfirm: boolean;
  isDisabled?: boolean;
  isOpen: boolean;
  isSubmitting: boolean;
  selectedTableId: number | null;
  selectedDate: string | null;
  selectedTime: string | null;
  partySize: number | null;
  onOpen: () => void;
  onClose: () => void;
  onSubmit: () => void;
};

export default function BookingConfirmation({
  canConfirm,
  isDisabled = false,
  isOpen,
  isSubmitting,
  selectedTableId,
  selectedDate,
  selectedTime,
  partySize,
  onOpen,
  onClose,
  onSubmit,
}: BookingConfirmationProps) {
  const isButtonDisabled = !canConfirm || isDisabled;

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: "1rem",
          bottom: "1rem",
          zIndex: 30,
        }}
      >
        {/* Broneeringu kinnitamise nupp */}
        <button
          type="button"
          disabled={isButtonDisabled}
          onClick={onOpen}
          style={{
            background: isButtonDisabled ? "#9ca3af" : "#2563eb",
            color: "#ffffff",
            border: "none",
            padding: "0.8rem 1.2rem",
            borderRadius: "10px",
            fontWeight: 700,
            cursor: isButtonDisabled ? "not-allowed" : "pointer",
            boxShadow: isButtonDisabled ? "none" : "0 10px 24px rgba(37, 99, 235, 0.28)",
            opacity: isDisabled ? 0.65 : 1,
          }}
        >
          Confirm the booking
        </button>
      </div>

        {/* Broneeringu kinnitamise dialoog */}
      {isOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Booking confirmation"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.55)",
            display: "grid",
            placeItems: "center",
            zIndex: 1100,
          }}
        >
          <div
            style={{
              width: "min(92vw, 420px)",
              background: "#ffffff",
              borderRadius: "16px",
              padding: "1.25rem",
              boxShadow: "0 18px 48px rgba(15, 23, 42, 0.28)",
              color: "#1f2937",
            }}
          >
            <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "0.75rem" }}>
              Confirm booking
            </h2>
            <p style={{ marginBottom: "0.5rem" }}>
              Review the current selection before submitting.
            </p>

            {/* Broneeringu informatsioon */}
            <p style={{ marginBottom: "0.35rem" }}><strong>Table:</strong> {selectedTableId ?? "-"}</p>
            <p style={{ marginBottom: "0.35rem" }}><strong>Date:</strong> {selectedDate ?? "-"}</p>
            <p style={{ marginBottom: "0.35rem" }}><strong>Time:</strong> {selectedTime ?? "-"}</p>
            <p style={{ marginBottom: "1rem" }}><strong>Guests:</strong> {partySize ?? "-"}</p>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                {/* Tagasiminemise nupp */}
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                style={{
                  background: "#e5e7eb",
                  color: "#1f2937",
                  border: "none",
                  padding: "0.7rem 1rem",
                  borderRadius: "10px",
                  fontWeight: 600,
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                }}
              >
                Go back
              </button>

                {/* Broneeringu esitamise nupp */}
              <button
                type="button"
                onClick={onSubmit}
                disabled={isSubmitting}
                style={{
                  background: isSubmitting ? "#93c5fd" : "#2563eb",
                  color: "#ffffff",
                  border: "none",
                  padding: "0.7rem 1rem",
                  borderRadius: "10px",
                  fontWeight: 700,
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                }}
              >
                {isSubmitting ? "Submitting..." : "Submit booking"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}