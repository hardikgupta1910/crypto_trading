package com.hardik.CryptoTrading.controller;

import com.hardik.CryptoTrading.response.CBApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CBHomeController {
	
	@GetMapping("/chatbot")
	public ResponseEntity<CBApiResponse> CBHome(){
		
		CBApiResponse response=new CBApiResponse();
		response.setMessage("Welcome to chatbot");
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
}
