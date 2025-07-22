package com.hardik.CryptoTrading.controller;

import com.hardik.CryptoTrading.model.User;
import com.hardik.CryptoTrading.model.Wallet;
import com.hardik.CryptoTrading.model.WalletTransaction;
import com.hardik.CryptoTrading.model.Withdrawal;
import com.hardik.CryptoTrading.service.WalletService;
import com.hardik.CryptoTrading.service.UserService;
import com.hardik.CryptoTrading.service.WithdrawalService;
import org.hibernate.grammars.hql.HqlParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/withdrawal")
public class WithdrawalController {
	
	@Autowired
	private WithdrawalService withdrawalService;
	
	@Autowired
	private WalletService walletService;
	
	@Autowired
	private UserService userService;


//	@Autowired
//	private WalletTransactionService walletTransactionService;
	
	@PostMapping("/{amount}")
	public ResponseEntity<?> withdrawalRequest(@PathVariable Long amount,
											   @RequestHeader("Authorization") String jwt) throws Exception {
		User user = userService.findUserProfileByJwt(jwt);
		Wallet userWallet = walletService.getUserWallet(user);
		
		Withdrawal withdrawal = withdrawalService.requestWithdrawal(amount, user);
		walletService.addBalance(userWallet, -withdrawal.getAmount());
		
		
		
		return new ResponseEntity<>(withdrawal, HttpStatus.OK);
	}
	
	
	@PatchMapping("/api/admin/withdrawal/{id}/proceed/{accept}")
	public ResponseEntity<?> proceedWithWithdrawal(@PathVariable Long id,
												   @PathVariable boolean accept,
												   @RequestHeader("Authorization") String jwt) throws Exception {
		
		User user= userService.findUserProfileByJwt(jwt);
		Withdrawal withdrawal=withdrawalService.proceedWithdrawal(id,accept);
		
		Wallet userWallet=walletService.getUserWallet(user);
		
		if(!accept){
			walletService.addBalance(userWallet, withdrawal.getAmount());
		}
		
		return new ResponseEntity<>(withdrawal, HttpStatus.OK);
	}
	
	@GetMapping()
	public ResponseEntity<List<Withdrawal>> getWithdrawalHistory(@RequestHeader("Authorization") String jwt) throws Exception {
		
		User user=userService.findUserProfileByJwt(jwt);
		
		List<Withdrawal> withdrawal=withdrawalService.getUsersWithdrawalHistory(user);
		
		return new ResponseEntity<>(withdrawal,HttpStatus.OK);
	}
	
	
	@GetMapping("/api/admin/withdrawal")
	public  ResponseEntity<List<Withdrawal>> getAllWithdrawalRequest(@RequestHeader("Authorization")String jwt) throws Exception {
		
		User user=userService.findUserProfileByJwt(jwt);
		
		List<Withdrawal> withdrawal= withdrawalService.getAllWithdrawalRequest();
		
		return new ResponseEntity<>(withdrawal, HttpStatus.OK);
	}
	
}