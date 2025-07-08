package com.hardik.CryptoTrading.repository;

import com.hardik.CryptoTrading.model.VerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerificationCodeRepository extends JpaRepository<VerificationCode ,Long> {
	
	public VerificationCode findByUserId(Long userId);
}
