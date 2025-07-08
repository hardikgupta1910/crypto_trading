package com.hardik.CryptoTrading.controller;

import com.hardik.CryptoTrading.model.User;
import com.hardik.CryptoTrading.model.UserTransaction;
import com.hardik.CryptoTrading.service.TransactionService;
import com.hardik.CryptoTrading.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transaction")
public class UserTransactionController {
	
	@Autowired
	private TransactionService transactionService;
	
	@Autowired
	private UserService userService;
	
	@GetMapping
	public ResponseEntity<List<UserTransaction>> getMyTransactions(@RequestHeader("Authorization") String jwt) throws Exception {
		User user = userService.findUserProfileByJwt(jwt);
		return ResponseEntity.ok(transactionService.getUserTransactions(user));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<UserTransaction> getTransactionById(@PathVariable Long id) throws Exception {
		return ResponseEntity.ok(transactionService.getTransactionById(id));
	}
	
}
