package com.hardik.CryptoTrading.repository;

import com.hardik.CryptoTrading.model.ForgotPasswordToken;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ForgotPasswordRepository extends JpaRepository<ForgotPasswordToken,String> {
	
	ForgotPasswordToken findByUserId(Long UserId);
	
}
