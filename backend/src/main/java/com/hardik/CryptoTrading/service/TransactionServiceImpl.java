package com.hardik.CryptoTrading.service;

import com.hardik.CryptoTrading.model.UserTransaction;
import com.hardik.CryptoTrading.model.User;
import com.hardik.CryptoTrading.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class TransactionServiceImpl implements TransactionService {
	
	
	@Autowired
	private TransactionRepository transactionRepository;
	
	
	
	
	@Override
	public UserTransaction recordTransaction(User user, BigDecimal amount, String type, String status) {
		UserTransaction txn = new UserTransaction();
		txn.setUser(user);
		txn.setAmount(amount);
		txn.setType(type);
		txn.setStatus(status);
		txn.setTimestamp(LocalDateTime.now());
		return transactionRepository.save(txn);
	}
	
	@Override
	public List<UserTransaction> getUserTransactions(User user) {
		return transactionRepository.findByUser(user);
	}
	
	@Override
	public UserTransaction getTransactionById(Long id) throws Exception {
		return transactionRepository.findById(id).orElseThrow(() -> new Exception("Transaction not found"));
	}
}
