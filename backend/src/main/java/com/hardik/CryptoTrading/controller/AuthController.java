package com.hardik.CryptoTrading.controller;

import com.hardik.CryptoTrading.config.JwtProvider;

import com.hardik.CryptoTrading.model.User;
import com.hardik.CryptoTrading.repository.UserRepository;
import com.hardik.CryptoTrading.response.AuthResponse;
import com.hardik.CryptoTrading.service.CustomUserDetailsService;

import com.hardik.CryptoTrading.service.WatchlistService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private CustomUserDetailsService customUserDetailsService;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private WatchlistService watchlistService;
	

	
	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> register(@RequestBody User user) throws Exception {
		
		
		User isEmailExist=userRepository.findByEmail(user.getEmail());
		
		if(isEmailExist!=null){
			throw new Exception("email is already used with another account");
		}
		User newUser=new User();
		newUser.setEmail(user.getEmail());
//		newUser.setPassword(user.getPassword());
		newUser.setPassword(passwordEncoder.encode(user.getPassword()));
		newUser.setFullName(user.getFullName());
		
		User savedUser;
		
		try {
			savedUser = userRepository.save(newUser);
			watchlistService.createWatchlist(savedUser);
		} catch (Exception e) {
			throw new Exception("Email already exists");
		}
		
		watchlistService.createWatchlist(savedUser);
		
		
		Authentication auth = new UsernamePasswordAuthenticationToken(
				user.getEmail(),
				user.getPassword()
		);
		SecurityContextHolder.getContext().setAuthentication(auth);
		
		String jwt= JwtProvider.generateToken(auth);
		
		AuthResponse res = new AuthResponse();
		res.setJwt(jwt);
		res.setStatus(true);
		res.setMessage("registered success");
		
		
		return new ResponseEntity<>(res, HttpStatus.CREATED);
	}

@PostMapping("/signin")
public ResponseEntity<AuthResponse> login(@RequestBody User user) throws Exception {
	
	String userName = user.getEmail();
	String password = user.getPassword();
	
	// Step 1: Authenticate the password. This is correct.
	Authentication auth = authenticate(userName, password);
	SecurityContextHolder.getContext().setAuthentication(auth);
	
	User authUser = userRepository.findByEmail(userName);
	
	AuthResponse res = new AuthResponse();
	

	String jwt = JwtProvider.generateToken(auth);
	res.setJwt(jwt);
	res.setStatus(true);
	res.setMessage("login success");
	
	return new ResponseEntity<>(res, HttpStatus.CREATED);
}

private Authentication authenticate(String username, String password) {
	// Your authenticate method is correct.
	UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
	if (userDetails == null) {
		throw new BadCredentialsException("invalid username");
	}
	if (!passwordEncoder.matches(password, userDetails.getPassword())) {
		throw new BadCredentialsException("Invalid password");
	}
	return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
}
	

}
