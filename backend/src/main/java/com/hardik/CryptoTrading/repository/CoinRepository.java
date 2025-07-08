package com.hardik.CryptoTrading.repository;

import com.hardik.CryptoTrading.model.Coin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoinRepository extends JpaRepository<Coin,String> {
}
