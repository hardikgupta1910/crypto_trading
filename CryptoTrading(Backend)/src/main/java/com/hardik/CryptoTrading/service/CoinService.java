package com.hardik.CryptoTrading.service;

import com.hardik.CryptoTrading.model.Coin;

import java.util.List;

public interface CoinService {
	
	List<Coin> getCoinList(int page) throws Exception;
	
	String getMarketChart(String coinId, int days) throws Exception;
	
	String getCoinDetails(String coinId) throws Exception; //coingeko api
	
	Coin findById(String coinId) throws Exception; // present in DB
	
	String searchCoin(String keyword) throws Exception;
	
	String getTop50CoinsByMarketCapRank() throws Exception;
	
	String getTrendingCoins() throws Exception;
	
}
