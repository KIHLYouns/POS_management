package com.dev.inventoryManagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dev.inventoryManagement.models.TransactionItem;

@Repository
public interface TransactionItemRepository extends JpaRepository<TransactionItem, Long> {
}