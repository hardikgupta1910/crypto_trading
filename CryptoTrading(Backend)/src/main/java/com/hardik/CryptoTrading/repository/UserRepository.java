package com.hardik.CryptoTrading.repository;

import com.hardik.CryptoTrading.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
	
	User findByEmail(String email);
}
