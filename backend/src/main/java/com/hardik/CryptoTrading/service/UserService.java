package com.hardik.CryptoTrading.service;

import com.hardik.CryptoTrading.domain.VerificationType;
import com.hardik.CryptoTrading.model.User;

public interface UserService {
	
	public User findUserProfileByJwt(String jwt) throws Exception;
	public User findUserByEmail(String email) throws Exception;
	public User findUserById(Long userId) throws Exception;
	
	public User enableTwoFactorAuthentication(
			VerificationType verificationType,
			String sendTo ,
			User user);
	
	User updatePassword(User user , String newPassword);
}
