package com.example.backend.services;

import org.springframework.stereotype.Component;
import com.example.backend.repositories.TableRepository;
import com.example.backend.entities.Table;
import java.util.ArrayList;

@Component
public class TableService {
    private final TableRepository tableRepository;
    
    public TableService(TableRepository tableRepository) {
        this.tableRepository = tableRepository;
    }

    public ArrayList<Table> getTableRepository() {
        return new ArrayList<>(tableRepository.findAll());
    }

    public void addTable(Table table) {
        tableRepository.save(table);
    }

    public void deleteTable(int id) {
        tableRepository.deleteById(id);
    }

    public void updateTable(Table table) {
        tableRepository.save(table);
    }
}
