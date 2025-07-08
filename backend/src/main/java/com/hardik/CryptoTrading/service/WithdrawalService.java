package com.hardik.CryptoTrading.service;

import com.hardik.CryptoTrading.model.User;
import com.hardik.CryptoTrading.model.Withdrawal;

import java.util.List;

public interface WithdrawalService {
	
	Withdrawal requestWithdrawal(Long amount, User user);
	
	Withdrawal proceedWithdrawal(Long withdrawalId, boolean accept) throws Exception;
	
	List<Withdrawal> getUsersWithdrawalHistory(User user);
	
	List<Withdrawal> getAllWithdrawalRequest();
	
}
