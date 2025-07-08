package com.hardik.CryptoTrading.model;

import com.hardik.CryptoTrading.domain.VerificationType;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class VerificationCode {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String otp;
	
	@OneToOne
	private User user;
	
	private String email;
	
	private String mobile;
	
	private VerificationType verificationType;
}
