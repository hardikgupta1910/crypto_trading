package com.hardik.CryptoTrading.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class OrderItem {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	private double quantity;
	
	@ManyToOne
	private Coin coin;
	
	private double buyPrice;
	
	private double sellPrice;
	
	@JsonIgnore // otherwise create recursion problem
	@OneToOne
	private Order order;
}
