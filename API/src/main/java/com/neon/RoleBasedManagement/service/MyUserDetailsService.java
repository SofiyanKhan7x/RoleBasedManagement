package com.neon.RoleBasedManagement.service;

import com.neon.RoleBasedManagement.model.UserPrinciple;
import com.neon.RoleBasedManagement.model.Users;
import com.neon.RoleBasedManagement.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo repo;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Users users = repo.findByUsername(username);

        if (users == null){
            System.out.println("User not found");
            throw new UsernameNotFoundException("user not found");
        }else {

        }

        return new UserPrinciple(users);
    }
}
