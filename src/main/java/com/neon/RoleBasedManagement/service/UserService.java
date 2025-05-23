package com.neon.RoleBasedManagement.service;

import com.neon.RoleBasedManagement.model.Users;
import com.neon.RoleBasedManagement.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    private JwtService jwtService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);


    public Users addAdmin(Users users) {
        users.setPassword(encoder.encode(users.getPassword()));
        return userRepo.save(users);
    }

    public List<Users> getAllSubUsers(Long parentId) {
        List<Users> result = new ArrayList<>();
        fetchChildrenRecursively(parentId, result);
        return result;
    }

    private void fetchChildrenRecursively(Long parentId, List<Users> result) {
        List<Users> children = userRepo.findByParentId(parentId);
        for (Users user : children) {
            result.add(user);
            fetchChildrenRecursively(user.getId(), result); // Recursive call
        }
    }


    public String verify(Users users) {
        Users dbUser = userRepo.findByUsername(users.getUsername());
        if (dbUser == null) {
            throw new RuntimeException("User not found");
        }

        Authentication authentication =
                authManager.authenticate(new UsernamePasswordAuthenticationToken(users.getUsername(), users.getPassword()));

        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(
                    dbUser.getUsername(), dbUser.getId(), dbUser.getRole().toString()
            );
        }

        throw new RuntimeException("Authentication failed");
    }

    public Users updateAdmin(Long id, Users users) {
        Users existUser = userRepo.findById(id).orElseThrow();
            existUser.setUsername(users.getUsername());
        if(users.getPassword() != null && !users.getPassword().isBlank()) {
            existUser.setPassword(encoder.encode(users.getPassword()));
        }

        existUser.setRole(users.getRole());
            existUser.setParent(users.getParent());
            return userRepo.save(existUser);

    }

    public String deleteAdmin(Long id) {
        userRepo.deleteById(id);
        return "User is Deleted!";
    }
}
