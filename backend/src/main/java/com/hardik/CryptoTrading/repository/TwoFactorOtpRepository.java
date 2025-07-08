package com.hardik.CryptoTrading.repository;

import com.hardik.CryptoTrading.model.TwoFactorAuth;
import com.hardik.CryptoTrading.model.TwoFactorOTP;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TwoFactorOtpRepository extends JpaRepository<TwoFactorOTP,String> {
	TwoFactorOTP findByUserId(Long userId);
}
