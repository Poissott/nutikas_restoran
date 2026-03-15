package com.example.backend.repositories;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.entities.Table;

// Repository liides laudade haldamiseks
@Repository
public interface TableRepository extends JpaRepository<Table, Integer> {
    
}
