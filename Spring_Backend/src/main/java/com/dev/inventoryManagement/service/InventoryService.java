package com.dev.inventoryManagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dev.inventoryManagement.models.InventoryItem;
import com.dev.inventoryManagement.models.TransactionItem;
import com.dev.inventoryManagement.repository.InventoryItemRepository;
import com.dev.inventoryManagement.repository.TransactionItemRepository;

@Service
public class InventoryService {

    @Autowired
    private InventoryItemRepository inventoryItemRepository;

    @Autowired
    private TransactionItemRepository transactionItemRepository;

    public List<InventoryItem> getAllInventoryItems() {
        return inventoryItemRepository.findAll();
    }

    public Optional<InventoryItem> getInventoryItemById(Long id) {
        return inventoryItemRepository.findById(id);
    }

    public InventoryItem saveInventoryItem(InventoryItem inventoryItem) {
        return inventoryItemRepository.save(inventoryItem);
    }

    @Transactional
    public Optional<InventoryItem> updateInventoryItem(Long id, InventoryItem inventoryItem) {
        return inventoryItemRepository.findById(id)
                .map(existingInventory -> {
                    existingInventory.setProduct(inventoryItem.getProduct());
                    existingInventory.setStockQuantity(inventoryItem.getStockQuantity());
                    existingInventory.setVendorCost(inventoryItem.getVendorCost());
                    existingInventory.setRetailPrice(inventoryItem.getRetailPrice());
                    return inventoryItemRepository.save(existingInventory);
                });
    }

    @Transactional
    public void deleteInventoryItem(Long id) {
        // Find all TransactionItems referencing this InventoryItem
        List<TransactionItem> relatedTransactionItems = transactionItemRepository.findByInventoryItemId(id);

        // Set the inventoryItem field to null in the related TransactionItems
        for (TransactionItem transactionItem : relatedTransactionItems) {
            transactionItem.setInventoryItem(null);
            transactionItemRepository.save(transactionItem);
        }

        // Now delete the InventoryItem
        inventoryItemRepository.deleteById(id);
    }
}
