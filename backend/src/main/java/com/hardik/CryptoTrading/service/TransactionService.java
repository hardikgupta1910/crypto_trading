package com.hardik.CryptoTrading.service;

import com.hardik.CryptoTrading.model.UserTransaction;
import com.hardik.CryptoTrading.model.User;

import java.math.BigDecimal;
import java.util.List;

public interface TransactionService {
	
	UserTransaction recordTransaction(User user, BigDecimal amount, String type, String status);
	List<UserTransaction> getUserTransactions(User user);
	UserTransaction getTransactionById(Long id) throws Exception;
	
	
}
