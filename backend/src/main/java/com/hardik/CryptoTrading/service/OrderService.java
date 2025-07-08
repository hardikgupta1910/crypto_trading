package com.hardik.CryptoTrading.service;

import com.hardik.CryptoTrading.domain.OrderType;
import com.hardik.CryptoTrading.model.Coin;
import com.hardik.CryptoTrading.model.Order;
import com.hardik.CryptoTrading.model.OrderItem;
import com.hardik.CryptoTrading.model.User;


import java.util.List;

public interface OrderService {
	
	Order createOrder(User user, OrderItem orderItem, OrderType orderType);
	
	Order getOrderById(Long orderId) throws Exception;
	
	List<Order> getAllOrderOfUser(Long userId, OrderType orderType, String assetSymbol);
	
	Order processOrder(Coin coin, double quantity,OrderType orderType, User user) throws Exception;
	
}
