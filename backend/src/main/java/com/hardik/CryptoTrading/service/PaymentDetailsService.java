package com.hardik.CryptoTrading.service;

import com.hardik.CryptoTrading.model.PaymentDetails;
import com.hardik.CryptoTrading.model.User;

public interface PaymentDetailsService {
	
	public PaymentDetails addPaymentDetails(String accountNumber,
											String accountHolderName,
											String ifsc, String bankName,
											User user);
	
	public PaymentDetails getUsersPaymentDetails(User user);
}
