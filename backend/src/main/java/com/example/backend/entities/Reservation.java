package com.example.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Reservation {
    @Id
    private int tableId;
    
    private String startTime;
    private String endTime;
    private int partySize;

    public Reservation(int tableId, String startTime, String endTime, int partySize) {
        this.tableId = tableId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.partySize = partySize;
    }
}
