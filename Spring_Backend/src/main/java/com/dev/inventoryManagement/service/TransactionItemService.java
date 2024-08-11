package com.dev.inventoryManagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.inventoryManagement.models.TransactionItem;
import com.dev.inventoryManagement.repository.TransactionItemRepository;

@Service
public class TransactionItemService {

    @Autowired
    private TransactionItemRepository transactionItemRepository;

    public List<TransactionItem> getAllTransactionItems() {
        return transactionItemRepository.findAll();
    }

    public Optional<TransactionItem> getTransactionItemById(Long id) {
        return transactionItemRepository.findById(id);
    }

    public TransactionItem saveTransactionItem(TransactionItem transactionItem) {
        // Ensure the transaction and product are not null or handle accordingly
        if (transactionItem.getTransaction() == null || transactionItem.getProduct() == null) {
            throw new IllegalArgumentException("Transaction and Product cannot be null");
        }
        return transactionItemRepository.save(transactionItem);
    }

    public Optional<TransactionItem> updateTransactionItem(Long id, TransactionItem updatedTransactionItem) {
        return transactionItemRepository.findById(id)
                .map(existingTransactionItem -> {
                    // Update fields, ensure transaction and product are properly managed
                    if (updatedTransactionItem.getTransaction() != null) {
                        existingTransactionItem.setTransaction(updatedTransactionItem.getTransaction());
                    }
                    if (updatedTransactionItem.getProduct() != null) {
                        existingTransactionItem.setProduct(updatedTransactionItem.getProduct());
                    }
                    existingTransactionItem.setQuantity(updatedTransactionItem.getQuantity());
                    existingTransactionItem.setPrice(updatedTransactionItem.getPrice());
                    return transactionItemRepository.save(existingTransactionItem);
                });
    }

    public void deleteTransactionItem(Long id) {
        transactionItemRepository.deleteById(id);
    }
    
}