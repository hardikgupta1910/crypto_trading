package com.hardik.CryptoTrading.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hardik.CryptoTrading.domain.USER_ROLE;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Data
public class User  implements UserDetails {
	
	@Id
	@GeneratedValue(strategy= GenerationType.AUTO)
	private Long Id;
	private String fullName;
	@Column(nullable = false, unique = true)
	private String email;
	
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY) // password is write only so user fetch from client site its password is not shown
     private String password;
	

	
	private USER_ROLE role= USER_ROLE.ROLE_CUSTOMER;
	
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// This method must return a list of roles.
		// We create a list and add the user's single role to it.
		List<GrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority(role.toString()));
		return authorities;
	}
	
	@Override
	public String getUsername() {
		// Spring Security will use this method to get the unique identifier for the user.
		// In your case, it's the email.
		return this.email;
	}
	
	// The following methods are for account status. For most apps,
	// returning 'true' is sufficient unless you have logic for disabling or locking accounts.
	
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}
	
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	
	@Override
	public boolean isEnabled() {
		return true;
	}

}
