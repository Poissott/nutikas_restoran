package com.example.backend.config;

import com.example.backend.entities.Reservation;
import com.example.backend.entities.Score;
import com.example.backend.entities.Table;
import com.example.backend.repositories.ReservationRepository;
import com.example.backend.repositories.TableRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final TableRepository tableRepository;
    private final ReservationRepository reservationRepository;

    public DataInitializer(TableRepository tableRepository, ReservationRepository reservationRepository) {
        this.tableRepository = tableRepository;
        this.reservationRepository = reservationRepository;
    }

    @Override
    public void run(String... args) {
        if (tableRepository.count() > 0 || reservationRepository.count() > 0) {
            return;
        }

        // Tulp 1
        Table table1 = tableRepository.save(new Table(null, 2, "m", 1, 10, 50, 60, 60, new Score(null, 45, 40, 8)));
        Table table2 = tableRepository.save(new Table(null, 2, "m", 2, 10, 200, 60, 60, new Score(null, 35, 32, 12)));
        Table table3 = tableRepository.save(new Table(null, 2, "m", 3, 10, 350, 60, 60, new Score(null, 48, 20, 6)));
        Table table4 = tableRepository.save(new Table(null, 2, "m", 4, 10, 500, 60, 60, new Score(null, 48, 20, 6)));

        // Tulp 2
        Table table5 = tableRepository.save(new Table(null, 4, "m", 5, 150, 160, 70, 70, new Score(null, 42, 38, 4)));
        Table table6 = tableRepository.save(new Table(null, 4, "m", 6, 150, 320, 70, 70, new Score(null, 42, 38, 4)));
        Table table7 = tableRepository.save(new Table(null, 4, "m", 7, 150, 480, 70, 70, new Score(null, 42, 38, 4)));

        // Tulp 3
        Table table8 = tableRepository.save(new Table(null, 6, "m", 8, 300, 50, 70, 120, new Score(null, 42, 38, 4)));
        Table table9 = tableRepository.save(new Table(null, 4, "m", 9, 300, 270, 70, 70, new Score(null, 42, 38, 4)));
        Table table10 = tableRepository.save(new Table(null, 4, "m", 10, 300, 430, 70, 70, new Score(null, 42, 38, 4)));
        Table table11 = tableRepository.save(new Table(null, 3, "m", 11, 300, 590, 70, 70, new Score(null, 42, 38, 4)));

        // Tulp 4
        Table table12 = tableRepository.save(new Table(null, 6, "m", 12, 450, 50, 70, 120, new Score(null, 42, 38, 4)));
        Table table13 = tableRepository.save(new Table(null, 4, "m", 13, 450, 270, 70, 70, new Score(null, 42, 38, 4)));
        Table table14 = tableRepository.save(new Table(null, 4, "m", 14, 450, 430, 70, 70, new Score(null, 42, 38, 4)));
        Table table15 = tableRepository.save(new Table(null, 3, "m", 15, 450, 590, 70, 70, new Score(null, 42, 38, 4)));

        // Tulp 5
        Table table16 = tableRepository.save(new Table(null, 2, "m", 16, 600, 50, 60, 60, new Score(null, 42, 38, 4)));
        Table table17 = tableRepository.save(new Table(null, 2, "m", 17, 600, 200, 60, 60, new Score(null, 42, 38, 4)));
        Table table18 = tableRepository.save(new Table(null, 2, "m", 18, 600, 350, 60, 60, new Score(null, 42, 38, 4)));
        Table table19 = tableRepository.save(new Table(null, 2, "m", 19, 600, 500, 60, 60, new Score(null, 42, 38, 4)));



        // Tulp 1 - broneeringud
        reservationRepository.save(new Reservation(null, table1.getId(), "2026-03-15T18:00", "2026-03-15T19:30", 2));
        reservationRepository.save(new Reservation(null, table2.getId(), "2026-03-15T19:00", "2026-03-15T20:30", 2));
        reservationRepository.save(new Reservation(null, table3.getId(), "2026-03-15T20:00", "2026-03-15T21:30", 2));
        reservationRepository.save(new Reservation(null, table4.getId(), "2026-03-15T21:00", "2026-03-15T22:00", 2));

        // Tulp 2 - broneeringud
        reservationRepository.save(new Reservation(null, table5.getId(), "2026-03-15T21:00", "2026-03-15T22:30", 4));
        reservationRepository.save(new Reservation(null, table6.getId(), "2026-03-15T16:00", "2026-03-15T17:30", 4));
        reservationRepository.save(new Reservation(null, table7.getId(), "2026-03-15T20:00", "2026-03-16T21:30", 4));

        // Tulp 3 - broneeringud
        reservationRepository.save(new Reservation(null, table8.getId(), "2026-03-15T15:00", "2026-03-16T16:30", 6));
        reservationRepository.save(new Reservation(null, table9.getId(), "2026-03-15T15:00", "2026-03-15T16:30", 4));
        reservationRepository.save(new Reservation(null, table10.getId(), "2026-03-15T16:00", "2026-03-15T17:30", 4));
        reservationRepository.save(new Reservation(null, table11.getId(), "2026-03-15T18:00", "2026-03-15T19:30", 3));

        // Tulp 4 - broneeringud
        reservationRepository.save(new Reservation(null, table12.getId(), "2026-03-16T02:00", "2026-03-16T03:30", 6));
        reservationRepository.save(new Reservation(null, table13.getId(), "2026-03-16T03:00", "2026-03-16T04:30", 4));
        reservationRepository.save(new Reservation(null, table14.getId(), "2026-03-16T04:00", "2026-03-16T05:30", 4));
        reservationRepository.save(new Reservation(null, table15.getId(), "2026-03-16T05:00", "2026-03-16T06:30", 3));

        // Tulp 5 - broneeringud
        reservationRepository.save(new Reservation(null, table16.getId(), "2026-03-16T09:00", "2026-03-16T10:00", 2));
        reservationRepository.save(new Reservation(null, table17.getId(), "2026-03-16T10:00", "2026-03-16T11:30", 2));
        reservationRepository.save(new Reservation(null, table18.getId(), "2026-03-16T11:00", "2026-03-16T11:45", 2));
        reservationRepository.save(new Reservation(null, table19.getId(), "2026-03-16T15:00", "2026-03-16T16:30", 2));
    }
}
