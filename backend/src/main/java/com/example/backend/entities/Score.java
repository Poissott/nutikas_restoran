package com.example.backend.entities;

import jakarta.persistence.Embeddable;

@Embeddable
public class Score {
    private Integer totalScore;
    private Integer quietnessScore;
    private Integer windowScore;
    private Integer playAreaScore;

    public Score() {}

    public Score(Integer totalScore, Integer quietnessScore, Integer windowScore, Integer playAreaScore) {
        this.totalScore = quietnessScore + windowScore + playAreaScore;
        this.quietnessScore = quietnessScore;
        this.windowScore = windowScore;
        this.playAreaScore = playAreaScore;
    }

    public Integer getTotalScore() {
        return totalScore;
    }
    public void setTotalScore(Integer totalScore) {
        this.totalScore = totalScore;
    }

    public Integer getQuietnessScore() {
        return quietnessScore;
    }
    public void setQuietnessScore(Integer quietnessScore) {
        this.quietnessScore = quietnessScore;
    }

    public Integer getWindowScore() {
        return windowScore;
    }
    public void setWindowScore(Integer windowScore) {
        this.windowScore = windowScore;
    }

    public Integer getPlayAreaScore() {
        return playAreaScore;
    }
    public void setPlayAreaScore(Integer playAreaScore) {
        this.playAreaScore = playAreaScore;
    }

}
