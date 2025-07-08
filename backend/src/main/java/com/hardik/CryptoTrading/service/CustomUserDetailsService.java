package com.hardik.CryptoTrading.service;

import com.hardik.CryptoTrading.model.User;
import com.hardik.CryptoTrading.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User user=userRepository.findByEmail(username);
		
		if(user==null){
			throw new UsernameNotFoundException(username);
		}
		List<GrantedAuthority> authorityList=new ArrayList<>();
		
		// assuming `user.getRole()` returns a string like "USER" or "ADMIN"
		String role = String.valueOf(user.getRole());
		
		if (!role.startsWith("ROLE_")) {
			role = "ROLE_" + role;
		}
		
		authorityList.add(new SimpleGrantedAuthority(role));
		
		return new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(),authorityList);
	}
}
