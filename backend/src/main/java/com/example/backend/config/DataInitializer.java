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

        Table windowTable = tableRepository.save(new Table(null, 2, "Window", 1, new Score(null, 40, 50, 5)));
        Table familyTable = tableRepository.save(new Table(null, 6, "Children", 2, new Score(null, 20, 10, 45)));
        Table quietTable = tableRepository.save(new Table(null, 4, "Quiet", 3, new Score(null, 50, 15, 5)));

        reservationRepository.save(new Reservation(null, windowTable.getId(), "2026-03-13T18:00", "2026-03-13T19:30", 2));
        reservationRepository.save(new Reservation(null, familyTable.getId(), "2026-03-13T19:00", "2026-03-13T20:30", 5));
        reservationRepository.save(new Reservation(null, quietTable.getId(), "2026-03-13T20:00", "2026-03-13T21:30", 3));
    }
}
