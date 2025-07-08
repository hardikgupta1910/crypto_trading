package com.hardik.CryptoTrading.service;

import com.hardik.CryptoTrading.model.PaymentDetails;
import com.hardik.CryptoTrading.model.User;
import com.hardik.CryptoTrading.repository.PaymentDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentDetailsImpl implements PaymentDetailsService{
	
	@Autowired
	private PaymentDetailsRepository paymentDetailsRepository;
	
	@Override
	public PaymentDetails addPaymentDetails(String accountNumber, String accountHolderName, String ifsc, String bankName, User user) {
		
		PaymentDetails paymentDetails=new PaymentDetails();
		paymentDetails.setAccountNumber(accountNumber);
		paymentDetails.setAccountHolderName(accountHolderName);
		paymentDetails.setIfsc(ifsc);
		paymentDetails.setBankName(bankName);
		paymentDetails.setUser(user);
		
		return paymentDetailsRepository.save(paymentDetails);
	}
	
	@Override
	public PaymentDetails getUsersPaymentDetails(User user) {
		
		
		return paymentDetailsRepository.findByUserId(user.getId());
	}
}
