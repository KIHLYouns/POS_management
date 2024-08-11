package com.dev.inventoryManagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dev.inventoryManagement.models.Inventory;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    // Custom query methods (e.g., find by product) can be added here
}
