package com.example.backend.services;

import org.springframework.stereotype.Component;
import com.example.backend.repositories.TableRepository;
import com.example.backend.repositories.ReservationRepository;
import com.example.backend.entities.Reservation;

@Component
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final TableRepository tableRepository;

    public ReservationService(ReservationRepository reservationRepository, TableRepository tableRepository) {
        this.reservationRepository = reservationRepository;
        this.tableRepository = tableRepository;
    }

    public void addReservation(Reservation reservation) {
        reservationRepository.save(reservation);
    }

    public void deleteReservation(int id) {
        reservationRepository.deleteById(id);
    }

    public void updateReservation(Reservation reservation) {
        reservationRepository.save(reservation);
    }
}
