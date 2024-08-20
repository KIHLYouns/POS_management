package com.dev.inventoryManagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.inventoryManagement.models.Transaction;
import com.dev.inventoryManagement.repository.TransactionRepository;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public Optional<Transaction> getTransactionById(Long id) {
        return transactionRepository.findById(id);
    }

    public Transaction saveTransaction(Transaction transaction) {
        if (transaction.getDate() == null) {
            throw new IllegalArgumentException("Transaction date cannot be null");
        }
        // Directly save the transaction, cascade type and orphanRemoval handle items
        return transactionRepository.save(transaction);
    }

    public Optional<Transaction> updateTransaction(Long id, Transaction updatedTransaction) {
        return transactionRepository.findById(id)
                .map(existingTransaction -> {
                    if (updatedTransaction.getDate() != null) {
                        existingTransaction.setDate(updatedTransaction.getDate());
                    }
                    existingTransaction.setTotalAmount(updatedTransaction.getTotalAmount());
                    
                    // Clear existing items and add all from updatedTransaction
                    existingTransaction.getItems().clear();
                    updatedTransaction.getItems().forEach(item -> {
                        item.setTransaction(existingTransaction); // Set the parent transaction
                        existingTransaction.getItems().add(item);
                    });
                    
                    return transactionRepository.save(existingTransaction);
                });
    }

    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }
}