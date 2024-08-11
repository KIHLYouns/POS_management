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
        // Ensure transactionDate is not null
        if (transaction.getTransactionDate() == null) {
            throw new IllegalArgumentException("Transaction date cannot be null");
        }
        return transactionRepository.save(transaction);
    }

    public Optional<Transaction> updateTransaction(Long id, Transaction updatedTransaction) {
        return transactionRepository.findById(id)
                .map(existingTransaction -> {
                    // Ensure transactionDate is not null
                    if (updatedTransaction.getTransactionDate() != null) {
                        existingTransaction.setTransactionDate(updatedTransaction.getTransactionDate());
                    }
                    existingTransaction.setTotalAmount(updatedTransaction.getTotalAmount());
                    return transactionRepository.save(existingTransaction);
                });
    }

    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }
}