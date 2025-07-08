package com.hardik.CryptoTrading.controller;

import com.hardik.CryptoTrading.config.JwtProvider;
import com.hardik.CryptoTrading.model.TwoFactorOTP;
import com.hardik.CryptoTrading.model.User;
import com.hardik.CryptoTrading.repository.UserRepository;
import com.hardik.CryptoTrading.response.AuthResponse;
import com.hardik.CryptoTrading.service.CustomUserDetailsService;
import com.hardik.CryptoTrading.service.EmailService;
import com.hardik.CryptoTrading.service.TwoFactorOtpService;
import com.hardik.CryptoTrading.service.WatchlistService;
import com.hardik.CryptoTrading.utils.OtpUtils;
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
	
	@Autowired
	private TwoFactorOtpService twoFactorOtpService;
	
	@Autowired
	private EmailService emailService;
	
	
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
		
		User savedUser= userRepository.save(newUser);
		
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
		
		
		String userName=user.getEmail();
		String password=user.getPassword();
		
		Authentication auth = authenticate(user.getEmail(), user.getPassword());
		
		SecurityContextHolder.getContext().setAuthentication(auth);
		
		String jwt= JwtProvider.generateToken(auth);
		
		User authUser =  userRepository.findByEmail(userName);
		
		if(user.getTwoFactorAuth().isEnabled()){
			AuthResponse response = new AuthResponse();
			response.setMessage("Two factor auth is enabled");
			response.setTwoFactorAuthEnabled(true);
			String otp= OtpUtils.generateOtp();
			
			
			TwoFactorOTP oldTwoFactorOTP=twoFactorOtpService.findByUserId(authUser.getId());
			
			if(oldTwoFactorOTP!=null){
				twoFactorOtpService.deleteTwoFactorOtp(oldTwoFactorOTP);
			}
			
			TwoFactorOTP newTwoFactorOTP= twoFactorOtpService.createTwoFactorOtp(authUser, otp, jwt);
		
			emailService.sendVerificationOtpEmail(userName, otp);
			
			
			
			 response.setSession(newTwoFactorOTP.getId());
			 return new ResponseEntity<>(response,  HttpStatus.ACCEPTED);
		
		}
		
		
		
		AuthResponse res = new AuthResponse();
		res.setJwt(jwt);
		res.setStatus(true);
		res.setMessage("login success");
		
		
		return new ResponseEntity<>(res, HttpStatus.CREATED);
	}
	
	private Authentication authenticate(String username, String password) {
		UserDetails userDetails=customUserDetailsService.loadUserByUsername(username);
		
		if(userDetails==null){
			throw new BadCredentialsException("invalid username");
			
		}
		if (!passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("Invalid password");
		}
		return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
	}
	
	@PostMapping("/two-factor/otp/{otp}")
	public ResponseEntity<AuthResponse> verifySigningOtp(
			@PathVariable String otp ,
			@RequestParam String id ) throws Exception {
		
		TwoFactorOTP twoFactorOTP=twoFactorOtpService.findById(id);
		if(twoFactorOtpService.verifyTwoFactorOtp(twoFactorOTP, otp)){
			AuthResponse res = new AuthResponse();
			res.setMessage("Two Factor authentication verified");
			res.setTwoFactorAuthEnabled(true);
			res.setJwt(twoFactorOTP.getJwt());
			
			return new ResponseEntity<>(res,HttpStatus.OK);
		}
		throw new Exception("invalid otp");
	}
	
}
