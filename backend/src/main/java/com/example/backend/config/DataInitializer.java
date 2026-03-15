package com.example.backend.config;

import com.example.backend.entities.Reservation;
import com.example.backend.entities.Score;
import com.example.backend.entities.Table;
import com.example.backend.repositories.ReservationRepository;
import com.example.backend.repositories.TableRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Random;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    // Broneeringute ja tabelite loomise parameetrid
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
    private static final LocalTime OPENING_TIME = LocalTime.of(8, 0);
    private static final LocalTime CLOSING_TIME = LocalTime.of(22, 0);
    private static final int SLOT_MINUTES = 15;
    private static final int MIN_RESERVATION_MINUTES = 45;
    private static final int MAX_RESERVATION_MINUTES = 180;

    // Broneeringud luuakse järgneva 30 päeva jooksul, sh täna. Seda võib kohandada vastavalt vajadusele.
    private static final int MIN_DAYS_AHEAD = 0;
    private static final int MAX_DAYS_AHEAD = 30;

    private final TableRepository tableRepository;
    private final ReservationRepository reservationRepository;
    private final Random random = new Random();

    // Konstruktor parameetritega TableRepository ja ReservationRepository
    public DataInitializer(TableRepository tableRepository, ReservationRepository reservationRepository) {
        this.tableRepository = tableRepository;
        this.reservationRepository = reservationRepository;
    }

    // Andmebaasi käivitus
    @Override
    public void run(String... args) {
        if (reservationRepository.count() > 0) {
            return;
        }

        if (tableRepository.count() == 0) {
            seedDefaultTables();
        }

        seedRandomReservations();
    }

    // Laudade lisamine, kategorisseritud viite tulpa
    // Andmed (id, istekohtade arv,)
    private void seedDefaultTables() {
        // Tulp 1
        tableRepository.save(new Table(null, 2, 10, 50, 60, 60, new Score(40, 50, 50)));
        tableRepository.save(new Table(null, 2, 10, 200, 60, 60, new Score(50, 50, 30)));
        tableRepository.save(new Table(null, 2, 10, 350, 60, 60, new Score(50, 40, 10)));
        tableRepository.save(new Table(null, 2, 10, 500, 60, 60, new Score(40, 10, 0)));

        // Tulp 2
        tableRepository.save(new Table(null, 4, 150, 160, 70, 70, new Score(40, 20, 50)));
        tableRepository.save(new Table(null, 4, 150, 320, 70, 70, new Score(45, 20, 20)));
        tableRepository.save(new Table(null, 4, 150, 480, 70, 70, new Score(45, 5, 0)));

        // Tulp 3
        tableRepository.save(new Table(null, 6, 300, 50, 70, 120, new Score(40, 0, 50)));
        tableRepository.save(new Table(null, 4, 300, 270, 70, 70, new Score(40, 0, 20)));
        tableRepository.save(new Table(null, 4, 300, 430, 70, 70, new Score(40, 0, 10)));
        tableRepository.save(new Table(null, 3, 300, 590, 70, 70, new Score(35, 0, 0)));

        // Tulp 4
        tableRepository.save(new Table(null, 6, 450, 50, 70, 120, new Score(30, 20, 30)));
        tableRepository.save(new Table(null, 4, 450, 270, 70, 70, new Score(30, 20, 15)));
        tableRepository.save(new Table(null, 4, 450, 430, 70, 70, new Score(20, 5, 0)));
        tableRepository.save(new Table(null, 3, 450, 590, 70, 70, new Score(20, 0, 0)));

        // Tulp 5
        tableRepository.save(new Table(null, 2, 600, 50, 60, 60, new Score(10, 50, 5)));
        tableRepository.save(new Table(null, 2, 600, 200, 60, 60, new Score(10, 50, 0)));
        tableRepository.save(new Table(null, 2, 600, 350, 60, 60, new Score(10, 35, 0)));
        tableRepository.save(new Table(null, 2, 600, 500, 60, 60, new Score(0, 10, 0)));
    }

    // Broneeringute loomine juhuslike andmetega
    private void seedRandomReservations() {
        List<Table> tables = tableRepository.findAll();

        for (Table table : tables) {
            Map<LocalDate, List<int[]>> reservedRangesByDate = new HashMap<>();
            // Iga laua kohta luuakse 10 kuni 40 broneeringut. Seda võib kohandada vastavalt vajadusele.
            int reservationCount = random.nextInt(10, 40);
            for (int i = 0; i < reservationCount; i++) {
                Reservation reservation = createRandomReservation(table, reservedRangesByDate);
                if (reservation != null) {
                    reservationRepository.save(reservation);
                }
            }
        }
    }

    // Ühe jususliku broneeringu loomine
    private Reservation createRandomReservation(Table table, Map<LocalDate, List<int[]>> reservedRangesByDate) {
        // On 30 katset (vältimaks juhuslikult genereeritud aegade kattumist), et leida sobiva broneeringu aeg.
        for (int attempt = 0; attempt < 30; attempt++) {
            // Juhuslik päevade arv
            LocalDate startDate = LocalDate.now().plusDays(random.nextInt(MIN_DAYS_AHEAD, MAX_DAYS_AHEAD + 1));
            // Jususlik algusaeg
            int startMinutes = randomTimeSlotBetween(OPENING_TIME, CLOSING_TIME.minusMinutes(MIN_RESERVATION_MINUTES));

            // Juhuslik broneeringu kestvus
            int durationMinutes = randomDurationMinutes((CLOSING_TIME.toSecondOfDay() / 60) - startMinutes);
            if (durationMinutes <= 0) {
                continue;
            }

            int endMinutes = startMinutes + durationMinutes;
            // Kontroll, kas juhuslik aeg kattub juba olemasolevate broneeringute aegadega. Kui kattub, siis genereeritakse uus aeg.
            List<int[]> reservedRanges = reservedRangesByDate.computeIfAbsent(startDate, ignored -> new ArrayList<>());
            if (hasOverlap(startMinutes, endMinutes, reservedRanges)) {
                continue;
            }

            // Kui sobiv aeg leitud, siis lisatakse see broneeringute nimekirja, et vältida edasisi kattumisi.
            reservedRanges.add(new int[] {startMinutes, endMinutes});

            // Broneeringu alguse ja lõpu vormingusse viimine
            LocalDateTime start = LocalDateTime.of(startDate, minutesToTime(startMinutes));
            LocalDateTime end = LocalDateTime.of(startDate, minutesToTime(endMinutes));

            // Juhuslik osalejate arv, mis ei ületa laua istekohtade arvu
            int partySize = random.nextInt(1, table.getSeats() + 1);

            // Tagastatakse uus broneering
            return new Reservation(
                null,
                table.getId(),
                start.format(DATE_TIME_FORMATTER),
                end.format(DATE_TIME_FORMATTER),
                partySize
            );
        }

        return null;
    }

    // Juhusliku broneeringu kestvuse genereerimine, mis on vahemikus MIN_RESERVATION_MINUTES kuni MAX_RESERVATION_MINUTES, kuid ei ületa restorani sulgumise aega.
    private int randomDurationMinutes(int maxAllowedMinutes) {
        int minSlots = MIN_RESERVATION_MINUTES / SLOT_MINUTES;
        int maxSlots = Math.min(MAX_RESERVATION_MINUTES, maxAllowedMinutes) / SLOT_MINUTES;
        if (maxSlots < minSlots) {
            return -1;
        }

        int slots = random.nextInt(minSlots, maxSlots + 1);
        return slots * SLOT_MINUTES;
    }

    // Broneeringu aja kattumise kontroll
    private boolean hasOverlap(int startMinutes, int endMinutes, List<int[]> reservedRanges) {
        for (int[] range : reservedRanges) {
            if (startMinutes < range[1] && endMinutes > range[0]) {
                return true;
            }
        }
        return false;
    }

    // Juhusliku aja genereerimine minutites
    private int randomTimeSlotBetween(LocalTime min, LocalTime max) {
        int minSlot = min.toSecondOfDay() / 60 / SLOT_MINUTES;
        int maxSlot = max.toSecondOfDay() / 60 / SLOT_MINUTES;
        int selectedSlot = random.nextInt(minSlot, maxSlot + 1);
        return selectedSlot * SLOT_MINUTES;
    }

    // Minutite teisendamine LocalTime objektiks
    private LocalTime minutesToTime(int minutesFromMidnight) {
        return LocalTime.of(minutesFromMidnight / 60, minutesFromMidnight % 60);
    }
}
