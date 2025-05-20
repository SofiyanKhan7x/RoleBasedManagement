package com.neon.RoleBasedManagement.controller;

import com.neon.RoleBasedManagement.model.Users;
import com.neon.RoleBasedManagement.service.CashierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CashierController {

    @Autowired
    private CashierService cashierService;

    //Only ADMIN and MANAGER can add cashier
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @PostMapping("/addCashier")
    public Users addCashier(@RequestBody Users users){
        return cashierService.addCasheir(users);
    }

    //Only ADMIN and MANAGER can get all cashier
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @GetMapping("/getAllCashier")
    public List<Users> getAllCashier(){
        return cashierService.getAllCashier();
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
