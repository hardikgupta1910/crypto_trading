package com.hardik.CryptoTrading.service;

import com.hardik.CryptoTrading.domain.VerificationType;
import com.hardik.CryptoTrading.model.User;
import com.hardik.CryptoTrading.model.VerificationCode;

public interface VerificationCodeService {
	
	VerificationCode sendVerificationCode(User user, VerificationType verificationType);
	
	VerificationCode getVerificationCodeById(Long id) throws Exception;
	
	VerificationCode getVerificationCodeByUser(Long userId);

	
	
	void deleteVerificationCodeById(VerificationCode verificationCode);
	
}
