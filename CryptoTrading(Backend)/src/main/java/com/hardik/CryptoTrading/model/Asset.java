package com.hardik.CryptoTrading.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Asset {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private double quantity;
	private double buyPrice;
	
	@ManyToOne 						//many asset may have same coin
	private Coin coin;
	
	@ManyToOne    // one user have may asset
	private User user;

}
