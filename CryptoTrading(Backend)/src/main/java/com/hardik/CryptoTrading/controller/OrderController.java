package com.hardik.CryptoTrading.controller;

import com.hardik.CryptoTrading.domain.OrderType;
import com.hardik.CryptoTrading.model.Coin;
import com.hardik.CryptoTrading.model.Order;
import com.hardik.CryptoTrading.model.User;
import com.hardik.CryptoTrading.model.WalletTransaction;
import com.hardik.CryptoTrading.request.CreateOrderRequest;
import com.hardik.CryptoTrading.service.CoinService;
import com.hardik.CryptoTrading.service.OrderService;
import com.hardik.CryptoTrading.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private CoinService coinService;
	
//	@Autowired
//	private WalletTransactionService walletTransactionService;

	@PostMapping("/pay")
	 public ResponseEntity<Order> nayOrderPayment(@RequestHeader("Authorization") String jwt,
												  @RequestBody CreateOrderRequest req) throws Exception{
		 
		 User user=userService.findUserProfileByJwt(jwt);
		 Coin coin = coinService.findById(req.getCoinId());
		 
		 Order order=orderService.processOrder(coin,req.getQuantity(),req.getOrderType(),user);
		 
		 return ResponseEntity.ok(order);
	 }

	 @GetMapping("/{orderId}")
	public ResponseEntity<Order> getOrderById(@RequestHeader("Authorization") String jwt,
											  @PathVariable Long orderId) throws Exception{
		User user=userService.findUserProfileByJwt(jwt);
		Order order=orderService.getOrderById(orderId);
		
		if(order.getUser().getId().equals(user.getId())){
			return ResponseEntity.ok(order);
		}else {
			throw new Exception("you don't have Access");
		}
	}
	
	@GetMapping
	public ResponseEntity<List<Order>> getAllOrdersForUser(
			@RequestHeader("Authorization") String jwt,
			@RequestParam(required = false)OrderType order_type,
			@RequestParam(required = false) String asset_symbol
			) throws Exception{
		
		Long userId=userService.findUserProfileByJwt(jwt).getId();
		
		List<Order> userOrders=orderService.getAllOrderOfUser(userId,order_type,asset_symbol);
		
		return ResponseEntity.ok(userOrders);
	}
}
