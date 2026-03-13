package com.example.backend.services;

import java.util.List;
import org.springframework.stereotype.Service;
import com.example.backend.entities.Table;
import com.example.backend.repositories.TableRepository;

@Service
public class TableService {
    private final TableRepository tableRepository;

    public TableService(TableRepository tableRepository) {
        this.tableRepository = tableRepository;
    }

    public List<Table> getTables() {
        return tableRepository.findAll();
    }

    public Table getTableById(Integer id) {
        return tableRepository.findById(id).orElse(null);
    }

    public Table addTable(Table table) {
        return tableRepository.save(table);
    }

    public void deleteTable(Integer id) {
        tableRepository.deleteById(id);
    }

    public Table updateTable(Table table) {
        return tableRepository.save(table);
    }
}
