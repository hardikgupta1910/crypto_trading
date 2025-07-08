package com.hardik.CryptoTrading.repository;

import com.hardik.CryptoTrading.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem,Long> {

}
