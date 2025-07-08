package com.hardik.CryptoTrading.repository;

import com.hardik.CryptoTrading.model.PaymentDetails;
import com.hardik.CryptoTrading.service.PaymentDetailsImpl;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentDetailsRepository extends JpaRepository<PaymentDetails,Long> {
	
	PaymentDetails findByUserId(Long userId);
}
