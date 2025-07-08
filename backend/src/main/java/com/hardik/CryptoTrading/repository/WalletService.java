package com.hardik.CryptoTrading.repository;

import ch.qos.logback.classic.helpers.WithLayoutListAppender;
import com.hardik.CryptoTrading.model.Order;
import com.hardik.CryptoTrading.model.User;
import com.hardik.CryptoTrading.model.Wallet;


public interface WalletService {
	
	Wallet getUserWallet(User user);
	
	Wallet addBalance(Wallet wallet , Long money);
	
	Wallet findWalletById(Long id) throws Exception;
	
	Wallet walletToWalletTransfer(User user, Wallet recieveWallet, Long amount) throws Exception;
	
	Wallet payOrderPayment(Order order, User user) throws Exception;
	
}
