package com.dev.inventoryManagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dev.inventoryManagement.models.Inventory;
import com.dev.inventoryManagement.repository.InventoryRepository;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    public List<Inventory> getAllInventoryItems() {
        return inventoryRepository.findAll();
    }

    public Optional<Inventory> getInventoryItemById(Long id) {
        return inventoryRepository.findById(id);
    }

    public Inventory saveInventoryItem(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    @Transactional
    public Optional<Inventory> updateInventoryItem(Long id, Inventory inventory) {
        return inventoryRepository.findById(id)
                .map(existingInventory -> {
                    existingInventory.setProduct(inventory.getProduct());
                    existingInventory.setQuantity(inventory.getQuantity());
                    existingInventory.setVendorPrice(inventory.getVendorPrice());
                    existingInventory.setSalePrice(inventory.getSalePrice());
                    return inventoryRepository.save(existingInventory);
                });
    }

    public void deleteInventoryItem(Long id) {
        inventoryRepository.deleteById(id);
    }
}
