package com.hardik.CryptoTrading.model;

import com.hardik.CryptoTrading.domain.OrderStatus;
import com.hardik.CryptoTrading.domain.OrderType;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.type.OrderedMapType;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "orders")
public class Order {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@ManyToOne
	private User user;
	
	@Column(nullable = false)
	private OrderType orderType;
	
	@Column(nullable = false)
	private BigDecimal price;
	
	private LocalDateTime timestamp=LocalDateTime.now();

	@Column(nullable = false)
	private OrderStatus status;
	
	@OneToOne(mappedBy = "order",cascade = CascadeType.ALL)
	private OrderItem orderItem;
}
