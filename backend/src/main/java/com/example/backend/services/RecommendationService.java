package com.example.backend.services;

import org.springframework.stereotype.Service;
import com.example.backend.repositories.TableRepository;
import com.example.backend.entities.Table;

// quietnessScore + windowScore + playAreaScore = totalScore > 100 (Recommendation threshold);
// max indivudual score is 50

@Service
public class RecommendationService {
    private final TableRepository tableRepository;
    private static final double SCORE_THRESHOLD_HIGH = 100.0;
    private static final double SCORE_THRESHOLD_MEDIUM = 70.0;

    public RecommendationService(TableRepository tableRepository) {
        this.tableRepository = tableRepository;
    }

    public String getRecommendationLevel(Table table, int partySize) {
        if (table.getScore() == null) {
            return "No score available.";
        }

        double seatEfficiency = (double) partySize / table.getSeats();
        double combinedScore = table.getScore().getTotalScore() * seatEfficiency;

        if (combinedScore >= SCORE_THRESHOLD_HIGH) {
            return "Highly recommended table!";
        } else if (combinedScore >= SCORE_THRESHOLD_MEDIUM) {
            return "Recommended table.";
        } else {
            return "Not recommended.";
        }
    }
}
