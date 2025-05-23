package com.neon.RoleBasedManagement.controller;

import com.neon.RoleBasedManagement.model.Users;
import com.neon.RoleBasedManagement.repository.UserRepo;
import com.neon.RoleBasedManagement.service.CashierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class CashierController {

    @Autowired
    private CashierService cashierService;

    @Autowired
    private UserRepo userRepo;
    //Only ADMIN and MANAGER can add cashier
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @PostMapping("/addCashier")
    public Users addCashier(@RequestBody Users users , Authentication authentication){
        // Get logged-in  username
        String adminUsername = authentication.getName();

        // Find user in DB to get ID
        Users u = userRepo.findByUsername(adminUsername);

        users.setParent(u);
        return cashierService.addCasheir(users);
    }

    //Only ADMIN and MANAGER can get all cashier
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @GetMapping("/getAllCashier")
    public List<Users> getAllCashier(Authentication authentication){
        String username = authentication.getName();
        Users admin = userRepo.findByUsername(username);
        return cashierService.getAllCashier(admin.getId());
    }

    //Only ADMIN and MANAGER can update cashier
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @PutMapping("/updateCashier/{id}")
    public Users updateCashier(@PathVariable Long id,@RequestBody Users users){
        return cashierService.updateCashier(id,users);
    }

    //Only ADMIN and MANAGER can add cashier
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @DeleteMapping("/deleteCashier/{id}")
    public String deleteCashier(@PathVariable Long id){
        cashierService.deleteCashier(id);
        return "User Deleted Successfully!";
    }


}
