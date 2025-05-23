package com.neon.RoleBasedManagement.controller;

import com.neon.RoleBasedManagement.model.Users;
import com.neon.RoleBasedManagement.repository.UserRepo;
import com.neon.RoleBasedManagement.service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class ManagerController {

    @Autowired
    private ManagerService managerService;

    @Autowired
    private UserRepo userRepo;

    //Only Admin can create the new manager
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/addManager")
    public Users addManager(@RequestBody Users users, Authentication authentication){
        // Get logged-in admin's username
        String adminUsername = authentication.getName();

        // Find admin in DB to get ID
        Users admin = userRepo.findByUsername(adminUsername);

        // Set the creator as parent
        users.setParent(admin);
        return managerService.addManager(users);
    }

//    //Only Admin can see the all managers
//    @PreAuthorize("hasRole('ADMIN')")
//    @GetMapping("/getAllManagers/{id}")
//    public List<Users> getAllManagers(@PathVariable Long id){
//        return managerService.getAllManagers(id);
//    }



    //Only Admin can update manager
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/updateManager/{id}")
    public Users updateManager(@PathVariable Long id, @RequestBody Users users){
        return managerService.updateManager(id,users);
    }

    //Only Admin can delete the manager
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("deleteManager/{id}")
    public String deleteManager(@PathVariable Long id){
        managerService.deleteManager(id);
        return "Manager Deleted Successfully!";

    }


    // Modify your getAllManagers endpoint
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getAllManagers")
    public List<Users> getAllManagers(Authentication authentication) {
        String username = authentication.getName();
        Users admin = userRepo.findByUsername(username);
        return managerService.getAllManagers(admin.getId());
    }


}
