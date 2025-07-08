package com.hardik.CryptoTrading.service;

import com.hardik.CryptoTrading.domain.VerificationType;
import com.hardik.CryptoTrading.model.ForgotPasswordToken;
import com.hardik.CryptoTrading.model.User;
import com.hardik.CryptoTrading.model.VerificationCode;

public interface ForgotPasswordService {

    ForgotPasswordToken createToken (User user,
									 String id, String otp,
									 VerificationType verificationType,
									 String sendTo);
	
	ForgotPasswordToken findById(String id);
	
	ForgotPasswordToken findByUser(Long userId);
	
	void deleteToken(ForgotPasswordToken token);
	

}
