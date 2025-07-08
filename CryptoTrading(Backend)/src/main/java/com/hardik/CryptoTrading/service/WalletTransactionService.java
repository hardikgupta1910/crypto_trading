package com.hardik.CryptoTrading.service;

import com.hardik.CryptoTrading.model.Wallet;
import com.hardik.CryptoTrading.model.WalletTransaction;

import java.math.BigDecimal;
import java.util.List;

public interface WalletTransactionService {
	
	WalletTransaction createTransaction(WalletTransaction transaction);
	WalletTransaction getTransactionById(Long id) throws Exception;
	List<WalletTransaction> getTransactionsForWallet(Wallet wallet);
	
}
