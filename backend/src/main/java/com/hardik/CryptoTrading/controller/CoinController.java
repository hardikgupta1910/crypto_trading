package com.hardik.CryptoTrading.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hardik.CryptoTrading.model.Coin;
import com.hardik.CryptoTrading.service.CoinService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map; // ✅ <-- This resolves your error


@RestController
@RequestMapping("/coins")
public class CoinController {
	
	@Autowired
	private CoinService coinService;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	@GetMapping
	public ResponseEntity<List<Coin>> getCoinList(@RequestParam(required = false, name = "page") Integer page) throws Exception {
		if (page == null) page = 1; // fallback default
		List<Coin> coins = coinService.getCoinList(page);
		return new ResponseEntity<>(coins, HttpStatus.ACCEPTED);
	}
//	ResponseEntity<List<Coin>> getCoinList(@RequestParam(required = false,name="page") int page) throws Exception {
//		List<Coin> coins=coinService.getCoinList(page);
//		return new ResponseEntity<>(coins, HttpStatus.ACCEPTED);
//	}
	
	
//	@GetMapping("/{coinId}/chart")
//	ResponseEntity<JsonNode> getMarketChart(@PathVariable String coinId,
//											  @RequestParam("days") int days) throws Exception {
//		String res=coinService.getMarketChart(coinId, days);
//		JsonNode jsonNode=objectMapper.readTree(res);
//		return new ResponseEntity<>(jsonNode, HttpStatus.ACCEPTED);
//	}
//
	@GetMapping("/{coinId}/chart")
	public ResponseEntity<?> getMarketChart(
			@PathVariable String coinId,
			@RequestParam int days) throws Exception {
		List<Map<String, Object>> chartData = coinService.getMarketChart(coinId, days);
		return new ResponseEntity<>(chartData, HttpStatus.OK);
	}
	
	
	@GetMapping("/search")
	ResponseEntity<JsonNode> searchCoin(@RequestParam("q") String keyword) throws Exception {
		String coin= coinService.searchCoin(keyword);
		JsonNode jsonNode=objectMapper.readTree(coin);
		return  ResponseEntity.ok(jsonNode);
	}
	
	@GetMapping("/top50")
	ResponseEntity<JsonNode> getTop50CoinByMarketCapRank() throws Exception {
		String coin= coinService.getTop50CoinsByMarketCapRank();
		JsonNode jsonNode=objectMapper.readTree(coin);
		return  ResponseEntity.ok(jsonNode);
	}
	@GetMapping("/trending")
	ResponseEntity<JsonNode> getTrendingCoin() throws Exception {
		String coin= coinService.getTrendingCoins();
		JsonNode jsonNode=objectMapper.readTree(coin);
		return  ResponseEntity.ok(jsonNode);
	}
	
	@GetMapping("/details/{coinId}")
	ResponseEntity<JsonNode> getCoinDetails(@PathVariable String coinId ) throws Exception {
		String coin=coinService.getCoinDetails(coinId);
		JsonNode jsonNode=objectMapper.readTree(coin);
		
		return ResponseEntity.ok(jsonNode);
	}
	
	@PostConstruct
	public void init() {
		System.out.println("✅ CoinController is loaded by Spring");
	}
	
}
