package com.neon.RoleBasedManagement.service;

import com.neon.RoleBasedManagement.enums.Role;
import com.neon.RoleBasedManagement.model.Users;
import com.neon.RoleBasedManagement.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ManagerService {

    @Autowired
    private UserRepo userRepo;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);


    public Users addManager(Users users) {
        users.setPassword(encoder.encode(users.getPassword()));
        return userRepo.save(users);
    }

    public List<Users> getAllManagers() {
        return userRepo.findByRole(Role.MANAGER);
    }


    public Users updateManager(Long id, Users users) {
        Users existUser = userRepo.findById(id).orElseThrow(() -> new RuntimeException("user not found with this id "+id));
        existUser.setUsername(users.getUsername());
        existUser.setPassword(encoder.encode(users.getPassword()));
        existUser.setRole(users.getRole());
        existUser.setParent(users.getParent());
        return userRepo.save(existUser);
    }

    public void deleteManager(Long id) {
        Optional<Users> existUser = userRepo.findById(id);
       if (existUser.isEmpty()){
           throw new RuntimeException("User not found!");
       }
       userRepo.deleteById(id);
    }


}
