package com.hardik.CryptoTrading.service;

import com.hardik.CryptoTrading.domain.OrderType;
import com.hardik.CryptoTrading.model.Order;
import com.hardik.CryptoTrading.model.User;
import com.hardik.CryptoTrading.model.Wallet;
import com.hardik.CryptoTrading.repository.WalletRepository;
import com.hardik.CryptoTrading.repository.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;


@Service
public class WalletServiceImpl implements WalletService {
	
	@Value("${app.use-dummy-amount}")
	private boolean useDummyAmount;
	
	
	@Autowired
	private WalletRepository walletRepository;
	
	@Override
	public Wallet getUserWallet(User user) {
		
		Wallet wallet= walletRepository.findByUserId(user.getId());
		if(wallet==null){
			wallet=new Wallet();
			wallet.setUser(user);
			wallet.setBalance(BigDecimal.ZERO); // always good to initialize
			wallet = walletRepository.save(wallet);
		}
		
		return wallet;
	}
	
	
	
//	@Override
//	public Wallet addBalance(Wallet wallet, Long money) {
//		BigDecimal balance= wallet.getBalance();
//		BigDecimal newBalance=balance.add(BigDecimal.valueOf(money));
//
//		wallet.setBalance((newBalance));
//		return walletRepository.save(wallet);
//	}
	
	@Override
	public Wallet addBalance(Wallet wallet, Long amount) {
		BigDecimal balanceToAdd = BigDecimal.valueOf(amount);
		wallet.setBalance(wallet.getBalance().add(balanceToAdd));
		return walletRepository.save(wallet);
	}


//	public Wallet addBalance(Wallet wallet, Long amount) {
//		if (wallet.getBalance() == null) {
//			wallet.setBalance(BigDecimal.ZERO);
//		}
//
//		BigDecimal updatedBalance = wallet.getBalance().add(BigDecimal.valueOf(amount));
//		wallet.setBalance(updatedBalance);
//
//		return walletRepository.save(wallet);
//	}
	
	
	@Override
	public Wallet findWalletById(Long id) throws Exception {
		Optional<Wallet> wallet = walletRepository.findById(id);
		if(wallet.isPresent()){
			return wallet.get();
		}
		
		throw  new Exception("Wallet not found");
	}

//	@Override
//	public Wallet walletToWalletTransfer(User sender, Wallet recieverWallet, Long amount) throws Exception {
//
//		//Sender Wallet
//
//		Wallet senderWallet=getUserWallet(sender);
//
//		if(senderWallet.getBalance().compareTo(BigDecimal.valueOf(amount))<0){
//			throw new Exception("Insufficient Balance");
//		}
//
//		BigDecimal senderBalance=senderWallet
//				.getBalance()
//				.subtract(BigDecimal.valueOf(amount));
//
//		senderWallet.setBalance(senderBalance);
//		walletRepository.save(senderWallet);
//
//		// update Receiver Wallet
//
//		BigDecimal receiverBalance=recieverWallet
//				.getBalance()
//				.add(BigDecimal.valueOf(amount));
//		recieverWallet.setBalance(receiverBalance);
//		walletRepository.save(recieverWallet);
//
//
//		return senderWallet;
//	}
	
	
	
	@Override
	public Wallet walletToWalletTransfer(User sender, Wallet receiverWallet, Long amount) throws Exception {
		if (useDummyAmount) {
			amount = 1000L; // fixed dummy transfer amount
		}
		
		Wallet senderWallet = getUserWallet(sender);
		if (senderWallet.getBalance().compareTo(BigDecimal.valueOf(amount)) < 0) {
			throw new Exception("Insufficient Balance");
		}
		
		senderWallet.setBalance(senderWallet.getBalance().subtract(BigDecimal.valueOf(amount)));
		receiverWallet.setBalance(receiverWallet.getBalance().add(BigDecimal.valueOf(amount)));
		
		walletRepository.save(senderWallet);
		walletRepository.save(receiverWallet);
		
		return senderWallet;
	}
	
	
	//@Override
//	public Wallet payOrderPayment(Order order, User user) throws Exception {
//
//		// we have to create wallet transaction as well
//
//		Wallet wallet=getUserWallet(user);
//
//		if(order.getOrderType().equals(OrderType.BUY)){
//			BigDecimal newBalance=wallet.getBalance().subtract(order.getPrice());
//			if(newBalance.compareTo(order.getPrice())<0){
//				throw new Exception("Insufficient funds for this transaction");
//			}
//			wallet.setBalance(newBalance);
//		}
//		else {
//			BigDecimal newBalance= wallet.getBalance().add(order.getPrice());
//			wallet.setBalance(newBalance);
//		}
//		walletRepository.save(wallet);
//
//
//		return wallet;
//	}
	
	@Override
	public Wallet payOrderPayment(Order order, User user) throws Exception {
		
		Wallet wallet = getUserWallet(user);
		
		// Use dummy fixed price if flag is true
		BigDecimal transactionAmount = useDummyAmount ? BigDecimal.valueOf(1000L) : order.getPrice();
		
		if (order.getOrderType().equals(OrderType.BUY)) {
			if (wallet.getBalance().compareTo(transactionAmount) < 0) {
				throw new Exception("Insufficient funds for this transaction");
			}
			wallet.setBalance(wallet.getBalance().subtract(transactionAmount));
		} else {
			wallet.setBalance(wallet.getBalance().add(transactionAmount));
		}
		
		return walletRepository.save(wallet);
	}
	
}