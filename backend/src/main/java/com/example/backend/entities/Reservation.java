package com.example.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Reservation {
    @Id
    private int tableId;

    @ManyToOne
    @JoinColumn(name = "tableId", referencedColumnName = "id", insertable = false, updatable = false)
    private Table table;
    
    private String startTime;
    private String endTime;
    private int partySize;

    public Reservation() {
    }

    public Reservation(int tableId, String startTime, String endTime, int partySize) {
        this.tableId = tableId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.partySize = partySize;
    }
}
