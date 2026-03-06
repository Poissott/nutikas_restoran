package com.example.backend.entities;

import jakarta.persistence.*;

@Entity(name = "reservations")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer tableId;

    @ManyToOne
    @JoinColumn(name = "tableId", referencedColumnName = "id", insertable = false, updatable = false)
    private Table table;
    
    private String startTime;
    private String endTime;
    private int partySize;

    public Reservation() {
    }

    public Reservation(Integer id, Integer tableId, String startTime, String endTime, int partySize) {
        this.id = id;
        this.tableId = tableId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.partySize = partySize;
    }

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getTableId() {
        return tableId;
    }
    public void setTableId(Integer tableId) {
        this.tableId = tableId;
    }

    public String getStartTime() {
        return startTime;
    }
    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }
    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public int getPartySize() {
        return partySize;
    }
    public void setPartySize(int partySize) {
        this.partySize = partySize;
    }
}
