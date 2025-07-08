package com.hardik.CryptoTrading.request;

import com.hardik.CryptoTrading.domain.OrderType;
import lombok.Data;

@Data
public class CreateOrderRequest {
	
	private String coinId;
	private double quantity;
	private OrderType orderType;
}
