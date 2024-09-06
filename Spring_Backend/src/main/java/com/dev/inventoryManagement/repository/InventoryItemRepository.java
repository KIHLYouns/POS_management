package com.dev.inventoryManagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dev.inventoryManagement.models.InventoryItem;

@Repository
public interface InventoryItemRepository extends JpaRepository<InventoryItem, Long> {
}
