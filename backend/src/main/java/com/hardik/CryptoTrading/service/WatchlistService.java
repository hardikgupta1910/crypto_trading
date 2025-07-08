package com.hardik.CryptoTrading.service;

import com.hardik.CryptoTrading.model.Coin;
import com.hardik.CryptoTrading.model.User;
import com.hardik.CryptoTrading.model.Watchlist;

public interface WatchlistService {
	
	Watchlist findUserWatchlist(Long userId) throws Exception;
	
	Watchlist createWatchlist(User user);
	Watchlist findById(Long id) throws Exception;
	
	Coin addItemToWatchlist(Coin coin, User user) throws Exception;
}
