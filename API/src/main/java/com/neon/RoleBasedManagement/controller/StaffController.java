package com.neon.RoleBasedManagement.controller;

import com.neon.RoleBasedManagement.model.Users;
import com.neon.RoleBasedManagement.repository.UserRepo;
import com.neon.RoleBasedManagement.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class StaffController {

    @Autowired
    private StaffService staffService;

    @Autowired
    private UserRepo userRepo;

    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    @PostMapping("/addStaff")
    public Users addStaff(@RequestBody Users users,Authentication authentication){

        // Get logged-in  user username
        String Username = authentication.getName();

        // Find user in DB to get ID
        Users u = userRepo.findByUsername(Username);

        users.setParent(u);
        return staffService.addStaff(users);
    }

    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    @GetMapping("/getAllStaff/{id}")
    public List<Users> getAllStaff(Authentication authentication) {
        String username = authentication.getName();
        Users admin = userRepo.findByUsername(username);
        return staffService.getAllStaff(admin.getId());
    }

    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    @PutMapping("/updateStaff/{id}")
    public Users updateStaff(@PathVariable Long id,@RequestBody Users users){
        return staffService.updateStaff(id,users);
    }
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    @DeleteMapping("/deleteStaff/{id}")
    public void deleteStaff(@PathVariable Long id){
        staffService.deleteStaff(id);
    }

}
