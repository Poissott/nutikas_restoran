package com.example.backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.entities.Table;

import com.example.backend.services.TableService;


@RestController
@RequestMapping("/api/tables")
public class TableController {
    private final TableService tableService;

    public TableController(TableService tableService) {
        this.tableService = tableService;
    }
    
    @GetMapping
    public List<Table> getTables() {
        return tableService.getTables();
    }

    @PostMapping
    public void addTable(@RequestBody Table table) {
        tableService.addTable(table);
    }

    @DeleteMapping("/{id}")
    public void deleteTable(@PathVariable Integer id) {
        tableService.deleteTable(id);
    }

    @PutMapping("/{id}")
    public Table updateTable(@PathVariable Integer id, @RequestBody Table table) {
        table.setId(id);
        tableService.updateTable(table);
        return table;
    }
}
