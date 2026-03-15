package com.example.backend.controllers;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.example.backend.entities.Reservation;
import com.example.backend.services.ReservationService; 


@RestController
@RequestMapping("/api/reservations")
public class ReservationController {
    private final ReservationService reservationService;
    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    // get-meetod broneeringute saamiseks
    @GetMapping
    public List<Reservation> getReservations() {
        return reservationService.getReservations();
    }

    // get-meetod broneeringute saamiseks kindla kuupäeva järgi
    @GetMapping("/{date}")
    public List<Reservation> getReservationsByDate(@PathVariable String date) {
        return reservationService.getReservationsByDate(date);
    }

    // post-meetod uue broneeringu lisamiseks
    @PostMapping
    public Reservation addReservation(@RequestBody Reservation reservation) {
        return reservationService.addReservation(reservation);
    }

    // delete-meetod broneeringu kustutamiseks ID järgi
    @DeleteMapping("/{id}")
    public void deleteReservation(@PathVariable Integer id) {
        reservationService.deleteReservation(id);
    }

    // put-meetod broneeringu uuendamiseks ID järgi
    @PutMapping("/{id}")
    public Reservation updateReservation(@PathVariable Integer id, @RequestBody Reservation reservation) {
        reservation.setId(id);
        return reservationService.updateReservation(reservation);
    }
}
