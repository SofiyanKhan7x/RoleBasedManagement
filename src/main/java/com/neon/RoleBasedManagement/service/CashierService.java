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
public class CashierService {

    @Autowired
    private UserRepo userRepo;

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public Users addCasheir(Users users) {
        users.setPassword(encoder.encode(users.getPassword()));
        return userRepo.save(users);
    }

    public List<Users> getAllCashier(Long id) {
        return userRepo.findByParentIdAndRole(id,Role.CASHIER);
    }

    public Users updateCashier(Long id, Users users) {
       Users existUser = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found! "+id));
       existUser.setUsername(users.getUsername());
       existUser.setPassword(encoder.encode(users.getPassword()));
//       existUser.setParent(users.getParent());
       existUser.setRole(users.getRole());

       return userRepo.save(existUser);

    }

    public void deleteCashier(Long id) {
        Users existUser = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found!"));
        userRepo.deleteById(existUser.getId());
    }

}
