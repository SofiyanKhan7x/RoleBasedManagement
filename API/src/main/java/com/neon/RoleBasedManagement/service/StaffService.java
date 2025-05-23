package com.neon.RoleBasedManagement.service;

import com.neon.RoleBasedManagement.enums.Role;
import com.neon.RoleBasedManagement.model.Users;
import com.neon.RoleBasedManagement.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StaffService {

    @Autowired
    private UserRepo userRepo;

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public Users addStaff(Users users) {
        users.setPassword(encoder.encode(users.getPassword()));
        return userRepo.save(users);
    }

    public List<Users> getAllStaff(Long id) {
        return userRepo.findByParentIdAndRole(id, Role.STAFF);
    }

    public Users updateStaff(Long id,Users users) {
       Users  existUser = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found!"));
       existUser.setUsername(users.getUsername());
       existUser.setPassword(encoder.encode(users.getPassword()));
       existUser.setRole(users.getRole());
//       existUser.setParent(users.getParent());
       return userRepo.save(existUser);

    }

    public void deleteStaff(Long id) {
        Users existUser = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found!"));
        userRepo.deleteById(existUser.getId());
    }
}
