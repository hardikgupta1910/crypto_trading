//package com.hardik.CryptoTrading.model;
//
//import com.hardik.CryptoTrading.domain.WalletTransactionType;
//import jakarta.persistence.*;
//import lombok.Data;
//
//import java.time.LocalDate;
//
//@Data
//@Entity
//public class WalletTransaction {
//
//	@Id
//	@GeneratedValue(strategy = GenerationType.AUTO)
//	private Long id;
//
//	@ManyToOne  // one wallet have many transaction
//	private Wallet wallet;
//
//	private WalletTransactionType type;
//
//	private LocalDate date;
//
//	private String transferId;
//
//	private String purpose;
//
//	private Long amount;
//
//}
package com.hardik.CryptoTrading.model;

import com.hardik.CryptoTrading.domain.WalletTransactionType;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Entity
public class WalletTransaction {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@ManyToOne
	private Wallet wallet;
	
	@Enumerated(EnumType.STRING) // ✅ Fix for enum field
	private WalletTransactionType type;
	
	private LocalDate date;
	
	private String transferId;
	
	private String purpose;
	
	private BigDecimal amount;
}