package com.hardik.CryptoTrading.service;

import com.hardik.CryptoTrading.config.JwtProvider;
import com.hardik.CryptoTrading.model.User;
import com.hardik.CryptoTrading.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	UserRepository userRepository;
	
	@Override
	public User findUserProfileByJwt(String jwt) throws Exception {
			String email= JwtProvider.getEmailFromToken(jwt);
			User user=userRepository.findByEmail(email);
			if(user==null){
				throw new Exception("User not found");
			}
			return user;
	}
	
	@Override
	public User findUserByEmail(String email) throws Exception {
		User user=userRepository.findByEmail(email);
		if(user==null){
			throw new Exception("User not found");
		}
		return user;
	}
	
	@Override
	public User findUserById(Long userId) throws Exception {
		Optional<User> user =userRepository.findById(userId);
		if(user.isEmpty()){
			throw new Exception("user not found");
		}
		return user.get();
	}
	

	
	
	@Override
	public User updatePassword(User user, String newPassword) {
		user.setPassword(newPassword);
		return userRepository.save(user);
	}
	
	@Override
	public List<User> findAllUsers() {
		// This is all you need!
		return userRepository.findAll();
	}
}
