package com.hardik.CryptoTrading.repository;

import com.hardik.CryptoTrading.model.User;
import com.hardik.CryptoTrading.model.UserTransaction;
import org.hibernate.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<UserTransaction,Long> {
	
	List findByUser(User user);
}
