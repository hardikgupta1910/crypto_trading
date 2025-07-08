package com.hardik.CryptoTrading.repository;

import com.hardik.CryptoTrading.model.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WalletRepository extends JpaRepository<Wallet,Long> {

	Wallet findByUserId(Long userId);

}
