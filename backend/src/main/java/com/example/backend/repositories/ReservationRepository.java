package com.example.backend.repositories;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.entities.Reservation;
import java.util.List;

// Repository liides broneeringute haldamiseks
@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    List<Reservation> findByStartTimeStartingWithOrEndTimeStartingWith(String startDate, String endDate); 
}