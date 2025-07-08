package com.hardik.CryptoTrading.repository;

import com.hardik.CryptoTrading.model.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WatchlistRepository extends JpaRepository<Watchlist,Long> {
	
	Watchlist findByUserId(Long userId);
}
