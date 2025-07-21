package com.hardik.CryptoTrading.service;

import com.hardik.CryptoTrading.response.CBApiResponse;

public interface CBService {
	
	CBApiResponse getCoinDetails(String prompt) throws Exception;
	
	String simpleChat(String prompt);
}
