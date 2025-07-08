package com.hardik.CryptoTrading.service;

import com.hardik.CryptoTrading.model.TwoFactorOTP;
import com.hardik.CryptoTrading.model.User;

public interface TwoFactorOtpService {
	
	TwoFactorOTP createTwoFactorOtp(User user , String otp, String jwt);
	
	TwoFactorOTP findByUserId(Long userId);
	
	TwoFactorOTP findById(String id);
	
	boolean verifyTwoFactorOtp(TwoFactorOTP twoFactorOTP, String otp);
	
	void deleteTwoFactorOtp(TwoFactorOTP twoFactorOTP);
}
