package com.example.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;


@Entity
public class Table {
    @Id
    private int id;
    
    private int seats;
    private String zone;
    private int position;

    public Table(int id, int seats, String zone, int position) {
        this.id = id;
        this.seats = seats;
        this.zone = zone;
        this.position = position;
    }
}