package com.hardik.CryptoTrading.controller;

import com.hardik.CryptoTrading.model.User;
import com.hardik.CryptoTrading.model.Wallet;
import com.hardik.CryptoTrading.model.WalletTransaction;
import com.hardik.CryptoTrading.service.WalletTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class WalletTransactionController {
	
	@Autowired
	private WalletTransactionService walletTransactionService;
	
	
	// Create transaction
	@PostMapping
	public WalletTransaction createTransaction(@RequestBody WalletTransaction transaction) {
		return walletTransactionService.createTransaction(transaction);
	}
	
	// Get by ID
	@GetMapping("/{id}")
	public WalletTransaction getTransactionById(@PathVariable Long id) throws Exception {
		return walletTransactionService.getTransactionById(id);
	}
	
	@PostMapping("/wallet")
	public List<WalletTransaction> getTransactionsByWallet(@RequestBody Wallet wallet) {
		return walletTransactionService.getTransactionsForWallet(wallet);
	}

}
