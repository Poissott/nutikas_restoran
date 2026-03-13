package com.example.backend.controllers;

import org.springframework.web.bind.annotation.*;

import com.example.backend.services.RecommendationService;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {
    private final RecommendationService recommendationService;
    private final TableController tableController;

    public RecommendationController(RecommendationService recommendationService, TableController tableController) {
        this.recommendationService = recommendationService;
        this.tableController = tableController;
    }

    
    @GetMapping("/table/{tableId}/partySize/{partySize}")
    public String getRecommendationLevel(@PathVariable Integer tableId, @PathVariable int partySize) {
        return recommendationService.getRecommendationLevel(tableController.getTableById(tableId), partySize);
    }
}
