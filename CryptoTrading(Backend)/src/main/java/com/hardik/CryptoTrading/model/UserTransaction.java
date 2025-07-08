package com.hardik.CryptoTrading.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
public class UserTransaction {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private BigDecimal amount;
	
	private String type; // e.g., DEPOSIT, WITHDRAWAL, TRANSFER
	
	private String status; // e.g., SUCCESS, PENDING, FAILED
	
	private LocalDateTime timestamp;
	
	@ManyToOne
	private User user;
}
