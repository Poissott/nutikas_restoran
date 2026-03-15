package com.example.backend.services;

import java.util.List;
import org.springframework.stereotype.Service;
import com.example.backend.entities.Reservation;
import com.example.backend.repositories.ReservationRepository;

// Service klass broneeringute haldamiseks, mis kasutab ReservationRepositoryt andmebaasitehingute jaoks
@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;

    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    public List<Reservation> getReservations() {
        return reservationRepository.findAll();
    }

    public List<Reservation> getReservationsByDate(String date) {
        return reservationRepository.findByStartTimeStartingWithOrEndTimeStartingWith(date, date);
    }

    public Reservation addReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    public void deleteReservation(Integer id) {
        reservationRepository.deleteById(id);
    }

    public Reservation updateReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }
}
