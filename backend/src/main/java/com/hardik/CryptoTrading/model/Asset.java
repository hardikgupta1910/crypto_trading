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
	
	@ManyToOne 						//one coin can be present in many asset
	private Coin coin;
	
	@ManyToOne    // one user have many asset
	private User user;

}
