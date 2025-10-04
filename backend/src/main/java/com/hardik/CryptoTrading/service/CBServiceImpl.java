package com.hardik.CryptoTrading.service;

import com.hardik.CryptoTrading.dto.CBCoinDto;
import com.hardik.CryptoTrading.response.CBApiResponse;
import com.hardik.CryptoTrading.response.CBFunctionResponse;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class CBServiceImpl implements CBService {
	
	
	String GEMINI_API_KEY="AIzaSyBjQJJRPr6SiRqIaMIEPv7p7mAj_mYWLo8";
	
	private double convertToDouble(Object value){
		if(value instanceof Integer){
			return ((Integer)value).doubleValue();
		} else if (value instanceof Long) {
			return ((Long)value).doubleValue();
		}
		else if(value instanceof Double){
			return (Double)value;
		}
		else throw new IllegalArgumentException("unsupported type"+ value.getClass().getName());
	}
	
	public CBCoinDto makeAPIRequest(String currencyName) throws Exception {
		String url="https://api.coingecko.com/api/v3/coins/"+currencyName;
		
		RestTemplate restTemplate=new RestTemplate();
		HttpHeaders headers=new HttpHeaders();
		
		HttpEntity<String> entity = new HttpEntity<>(headers);
		ResponseEntity<Map> responseEntity=restTemplate.getForEntity(url, Map.class);
		Map<String,Object> responseBody=responseEntity.getBody();
		
		if(responseBody !=null){
			Map<String,Object> image=(Map<String, Object>)responseBody.get("image");
			Map<String,Object> marketData=(Map<String, Object>)responseBody.get("market_data");
			
			CBCoinDto cbCoinDto= new CBCoinDto();
			cbCoinDto.setId((String)responseBody.get("id"));
			cbCoinDto.setName((String)responseBody.get("name"));
			cbCoinDto.setSymbol((String)responseBody.get("symbol"));
			cbCoinDto.setImage((String)image.get("large"));
			
			//market data
			
			cbCoinDto.setCurrentPrice(convertToDouble(((Map<String,Object>)marketData.get("current_price")).get("usd")));
			
			cbCoinDto.setMarketCap(convertToDouble(((Map<String,Object>)marketData.get("market_cap")).get("usd")));
			
			cbCoinDto.setMarketCapRank(convertToDouble((marketData.get("market_cap_rank"))));
			
			cbCoinDto.setTotalVolume(convertToDouble(((Map<String,Object>)marketData.get("total_volume")).get("usd")));
			
			cbCoinDto.setHigh24h(convertToDouble(((Map<String,Object>)marketData.get("high_24h")).get("usd")));
			
			cbCoinDto.setLow24h(convertToDouble(((Map<String,Object>)marketData.get("low_24h")).get("usd")));
			
			cbCoinDto.setPriceChange24h(convertToDouble((marketData.get("price_change_24h"))));
			
			cbCoinDto.setPriceChangePercentage24h(convertToDouble((marketData.get("price_change_percentage_24h"))));
			
			cbCoinDto.setMarketCapChange24h(convertToDouble((marketData.get("market_cap_change_24h"))));
			
			cbCoinDto.setMarketCapChangePercentage24h(convertToDouble((marketData.get("market_cap_change_percentage_24h"))));
			
			cbCoinDto.setCirculatingSupply(convertToDouble((marketData.get("circulating_supply"))));
			
			cbCoinDto.setTotalSupply(convertToDouble((marketData.get("total_supply"))));
			
			return cbCoinDto;
		}
		throw new Exception("coin not found");
	}
	
	
	public CBFunctionResponse getFunctionResponse(String prompt){
		String GEMINI_API_URL="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key="+GEMINI_API_KEY;
		
		// Create JSON request body using method chaining
		JSONObject requestBodyJson=new JSONObject()
				.put("contents", new JSONArray()
						.put(new JSONObject()
								.put("parts", new JSONArray()
										.put(new JSONObject()
												.put("text", prompt)
										)
								)
						)
				)
				.put("tools", new JSONArray()
						.put(new JSONObject()
								.put("functionDeclarations", new JSONArray()
										.put(new JSONObject()
												.put("name", "getCoinDetails")
												.put("description", "Get the coin details from given currency object")
												.put("parameters", new JSONObject()
														.put("type", "OBJECT")
														.put("properties", new JSONObject()
																.put("currencyName", new JSONObject()
																		.put("type", "STRING")
																		.put("description",
																				"The currency name, "+
																						"id, symbol.")
																)
																.put("currencyData", new JSONObject()
																		.put("type", "STRING")
																		.put("description",
																				"Currency Data id, "+
																						"symbol, "+
																						"name, "+
																						"image, "+
																						"current_price ,"+
																						"market_cap, "+
																						"market_cap_rank, "+
																						"fully_diluted_valuation,"+
																						"total_volume, high_24h, "+
																						"low_24h, price_change_24h, "+
																						"price_change_percentage_24h, "+
																						"market_cap_change_24h, "+
																						"market_cap_change_percentage_24h, "+
																						"circulating_supply, "+
																						"total_supply, "+
																						"max_supply, "+
																						"ath, "+
																						"ath_change_percentage, "+
																						"ath_date, "+
																						"atl, "+
																						"atl_change_percentage, "+
																						"atl_date, last_updated.")
																)
														)
														.put("required", new JSONArray()
																.put("currencyData")
																.put("currencyName")
														
														)
												)
										)
								)
						)
				);
		
		
		
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);
			
			HttpEntity<String> requestEntity = new HttpEntity<>(requestBodyJson.toString(), headers);
			RestTemplate restTemplate = new RestTemplate();
			ResponseEntity<String> response = restTemplate.postForEntity(GEMINI_API_URL, requestEntity, String.class);
			
			String responseBody = response.getBody();
			JSONObject jsonObject = new JSONObject(responseBody);
			
			JSONArray candidates = jsonObject.getJSONArray("candidates");
			JSONObject firstCandidate = candidates.getJSONObject(0);
			JSONObject content = firstCandidate.getJSONObject("content");
			JSONArray parts = content.getJSONArray("parts");
			JSONObject firstPart = parts.getJSONObject(0);
			
			// ✅ Check if functionCall exists safely
			if (!firstPart.has("functionCall")) {
				// Return a special "not found" response
				CBFunctionResponse notFound = new CBFunctionResponse();
				notFound.setCurrencyName("not_found");
				notFound.setCurrencyData("not_found");
				notFound.setFunctionName("not_found");
				return notFound;
			}
			
			JSONObject functionCall = firstPart.getJSONObject("functionCall");
			String functionName = functionCall.getString("name");
			JSONObject args = functionCall.getJSONObject("args");
			String currencyName = args.getString("currencyName");
			String currencyData = args.getString("currencyData");
			
			CBFunctionResponse res = new CBFunctionResponse();
			res.setFunctionName(functionName);
			res.setCurrencyName(currencyName);
			res.setCurrencyData(currencyData);
			return res;
			
		} catch (Exception e) {
			// Catch any JSON issues
			CBFunctionResponse errorRes = new CBFunctionResponse();
			errorRes.setFunctionName("not_found");
			errorRes.setCurrencyName("not_found");
			errorRes.setCurrencyData("not_found");
			return errorRes;
		}
	}
	
	
	@Override
	public CBApiResponse getCoinDetails(String prompt) throws Exception {
		CBFunctionResponse res= getFunctionResponse(prompt);
		
		
		String currencyName = res.getCurrencyName();
		if (currencyName == null || currencyName.isEmpty() ||
				currencyName.equalsIgnoreCase("not_found") ||
				currencyName.equalsIgnoreCase("undefined")) {
			
			CBApiResponse errorResponse = new CBApiResponse();
			errorResponse.setMessage("not found");
			return errorResponse;
		}
		
		
		CBCoinDto apiResponse=makeAPIRequest(res.getCurrencyName().toLowerCase());
		
		String GEMINI_API_URL="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key="+GEMINI_API_KEY;
		
		HttpHeaders headers=new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		
		//create JSON body method chaining
		String body =new JSONObject()
				.put("contents", new JSONArray()
						.put(new JSONObject()
								.put("role", "user")
								.put("parts", new JSONArray()
										.put(new JSONObject()
												.put("text", prompt)
										)
								)
						)
						.put(new JSONObject()
								.put("role", "model")
								.put("parts",new JSONArray()
										.put(new JSONObject()
												.put("functionCall", new JSONObject()
														.put("name", "getCoinDetails")
														.put("args", new JSONObject()
																.put("currencyName", res.getCurrencyName())
																.put("currencyData", res.getCurrencyData())
														)
												)
										)
								)
						)
						.put(new JSONObject()
								.put("role", "function")
								.put("parts", new JSONArray()
										.put(new JSONObject()
												.put("functionResponse", new JSONObject()
														.put("name", "getCoinDetails")
														.put("response", new JSONObject()
																.put("name", "getCoinDetails")
																.put("content", apiResponse)
														)
												)
										)
								)
						)
				)
				.put("tools", new JSONArray()
						.put(new JSONObject()
								.put("functionDeclarations", new JSONArray()
										.put(new JSONObject()
												.put("name", "getCoinDetails")
												.put("description", "Get crypto currency data from given currency object. ")
												.put("parameters", new JSONObject()
														.put("type", "OBJECT")
														.put("properties", new JSONObject()
																.put("currencyName", new JSONObject()
																		.put("type", "STRING")
																		.put("description", "The currency Name, "+ "id, "+"symbol.")
																)
																.put("currencyData", new JSONObject()
																		.put("type", "STRING")
																		.put("description", "The currency data id, "+"symbol, current price, "+"image," +"market cap rank" +"market cap extra...")
																)
														)
														.put("required", new JSONArray()
																.put("currencyName")
																.put("currencyData")
														)
												)
										)
								)
						)
				).toString();
		
		HttpEntity<String> request = new HttpEntity<>(body, headers);
		RestTemplate restTemplate=new RestTemplate();
		ResponseEntity<String> response=restTemplate.postForEntity(GEMINI_API_URL, request, String.class);
		
		
		String responseBody=response.getBody();
		System.out.println("---------"+responseBody);
		
		JSONObject jsonObject=new JSONObject(responseBody);
		
		// extract the first candidate
		JSONArray candidates= jsonObject.getJSONArray("candidates");
		JSONObject firstCandidate= candidates.getJSONObject(0);
		
		//Extract the text
		JSONObject content=firstCandidate.getJSONObject("content");
		JSONArray parts=content.getJSONArray("parts");
		JSONObject firstPart=parts.getJSONObject(0);
		String text=firstPart.getString("text");
		
		CBApiResponse ans=new CBApiResponse();
		ans.setMessage(text);
		
		return ans;
	}
	
	
	
	
	
	// simple chat
	@Override
	public String simpleChat(String prompt) {
		String GEMINI_API_URL="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key="+GEMINI_API_KEY ;
		
		HttpHeaders headers=new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		
		String requestBody=new JSONObject()
				.put("contents", new JSONArray()
						.put(new JSONObject()
								.put("parts", new JSONArray()
										.put(new JSONObject().put("text", prompt))))).toString();
		
		HttpEntity<String> requestEntity=new HttpEntity<>(requestBody,headers);
		
		RestTemplate restTemplate=new RestTemplate();
		ResponseEntity<String> response = restTemplate.postForEntity(GEMINI_API_URL, requestEntity , String.class);
		
		return response.getBody();
	}
}