package com.emc.rpsp.login.service;


import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.emc.rpsp.repository.UserRepository;

@Service
public class CurrentUserDetailsService implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private HttpServletRequest request;

	@Override
	public UserDetails loadUserByUsername(String userName)
			throws UsernameNotFoundException {
		
		String account = request.getParameter("account");
		com.emc.rpsp.domain.User currentUser = userRepository.findOneByLoginAndAccount(userName, account);	
		if(currentUser == null){
			throw new UsernameNotFoundException(userName);
		}
		User user = new User(currentUser.getLogin(), currentUser.getPassword(), AuthorityUtils.createAuthorityList("USER"));
		return user;
	}

}
