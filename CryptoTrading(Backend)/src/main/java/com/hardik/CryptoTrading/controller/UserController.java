package com.hardik.CryptoTrading.controller;

import com.hardik.CryptoTrading.request.ForgotTokenPasswordRequest;
import com.hardik.CryptoTrading.domain.VerificationType;
import com.hardik.CryptoTrading.model.ForgotPasswordToken;
import com.hardik.CryptoTrading.model.User;
import com.hardik.CryptoTrading.model.VerificationCode;
import com.hardik.CryptoTrading.request.ResetPasswordRequest;
import com.hardik.CryptoTrading.response.ApiResponse;
import com.hardik.CryptoTrading.response.AuthResponse;
import com.hardik.CryptoTrading.service.EmailService;
import com.hardik.CryptoTrading.service.ForgotPasswordService;
import com.hardik.CryptoTrading.service.UserService;
import com.hardik.CryptoTrading.service.VerificationCodeService;
import com.hardik.CryptoTrading.utils.OtpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private VerificationCodeService verificationCodeService;
	
	@Autowired
	private ForgotPasswordService forgotPasswordService;
	
	private String jwt;
	
	@GetMapping("/api/users/profile")
	public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String jwt) throws Exception {
		User user=userService.findUserProfileByJwt(jwt);
		
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}
	
	
	@PostMapping("/api/users/verification/{verificationType}/send otp")
	public ResponseEntity<String> sendVerificationOtp(
			@RequestHeader("Authorization") String jwt,
			@PathVariable VerificationType verificationType)
			throws Exception {


		User user=userService.findUserProfileByJwt(jwt);
		
		VerificationCode verificationCode=verificationCodeService.getVerificationCodeByUser(user.getId());
		
		if(verificationCode==null){
			verificationCodeService
					.sendVerificationCode(user,verificationType);
		}
		
		if(verificationType.equals(VerificationType.EMAIL)){
			emailService.sendVerificationOtpEmail(user.getEmail(), verificationCode.getOtp());
			
		}
		

		return new ResponseEntity<>("verification otp sent successfully", HttpStatus.OK);
	}
	
	
	
	@PatchMapping("/api/users/enable-two-factor/verify-otp/{otp}")
	public ResponseEntity<User> enableTwoFactorAuthentication(
			@PathVariable String otp,
			@RequestHeader("Authorization") String jwt) throws Exception {
		User user=userService.findUserProfileByJwt(jwt);
		
		VerificationCode verificationCode=verificationCodeService.getVerificationCodeByUser(user.getId());
		
		String sendTo=verificationCode.getVerificationType().equals(VerificationType.EMAIL)?
				verificationCode.getEmail():verificationCode.getMobile();
		
		boolean isVerified= verificationCode.getOtp().equals(otp);
		
		if(isVerified){
			User updateUser=userService.enableTwoFactorAuthentication(
					verificationCode.getVerificationType(),sendTo , user);
		
			
			verificationCodeService.deleteVerificationCodeById(verificationCode);
		 
			return new ResponseEntity<>(updateUser,HttpStatus.OK);
		}
  	
			throw new Exception("otp not match");
		
	
	}
	
	// two methods forgot password 1. send token 2. verify & update token
	
	@PostMapping("/auth/users/reset-password/send otp")
	public ResponseEntity<AuthResponse> sendForgotPasswordOtp(
			@RequestBody ForgotTokenPasswordRequest res)
			throws Exception {
		
		User user=userService.findUserByEmail(res.getSendTo());
		String otp = OtpUtils.generateOtp();
		UUID uuid=UUID.randomUUID();
		String id= uuid.toString();
		
		ForgotPasswordToken token = forgotPasswordService.findByUser(user.getId());
		
		if(token==null){
			token=forgotPasswordService.createToken(user,id,otp,res.getVerificationType(), res.getSendTo());
		}
		
		if(res.getVerificationType().equals(VerificationType.EMAIL)){
			emailService.sendVerificationOtpEmail(user.getEmail(), token.getOtp());
			
			}
		AuthResponse response=new AuthResponse();
		response.setSession(token.getId());
		response.setMessage("Password reset otp sent Successfully");
		
		
		return new ResponseEntity<>(response, HttpStatus.OK);
		
		
	}
	
	@PatchMapping("/auth/users/verify-password/verify-otp")
	public ResponseEntity<ApiResponse> resetPassword(
			@RequestParam String id,
			@RequestBody ResetPasswordRequest req,
			@RequestHeader("Authorization") String jwt) throws Exception {
		
		ForgotPasswordToken forgotPasswordToken =forgotPasswordService.findById(id);
		
		 boolean isVerified=forgotPasswordToken.getOtp().equals(req.getOtp());
		
		 if(isVerified){
			 userService.updatePassword(forgotPasswordToken.getUser(), req.getPassword());
			 ApiResponse res = new ApiResponse();
			 res.setMessage("password updated Successfully");
			 return new ResponseEntity<>(res,HttpStatus.ACCEPTED);
		 }
		 throw new Exception("wrong otp");
		
	}
	
}
