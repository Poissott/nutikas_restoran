package com.example.backend.entities;

import jakarta.persistence.*;



@Entity(name = "restaurant_tables")
public class Table {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    private int seats;
    private String zone;
    private int position;

    @Embedded
    private Score score;

    public Table() {
    }

    public Table(Integer id, int seats, String zone, int position, Score score) {
        this.id = id;
        this.seats = seats;
        this.zone = zone;
        this.position = position;
        this.score = score;
    }

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }

    public int getSeats() {
        return seats;
    }
    public void setSeats(int seats) {
        this.seats = seats;
    }

    public String getZone() {
        return zone;
    }
    public void setZone(String zone) {
        this.zone = zone;
    }

    public int getPosition() {
        return position;
    }
    public void setPosition(int position) {
        this.position = position;
    }

    public Score getScore() {
        return score;
    }
    public void setScore(Score score) {
        this.score = score;
    }
}