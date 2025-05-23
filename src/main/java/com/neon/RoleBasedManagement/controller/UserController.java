package com.neon.RoleBasedManagement.controller;

import com.neon.RoleBasedManagement.enums.Role;
import com.neon.RoleBasedManagement.model.Users;
import com.neon.RoleBasedManagement.repository.UserRepo;
import com.neon.RoleBasedManagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
//@CrossOrigin("*")
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepo userRepo;

    @PreAuthorize("hasRole('SUPERADMIN')")
    @PostMapping("/addAdmin")
    public Users addAdmin(@RequestBody Users users){
        return userService.addAdmin(users);
    }


    @PreAuthorize("hasRole('SUPERADMIN')")
    @GetMapping("/getAllAdmin")
    public List<Users> getAllAdmin(){
        return userRepo.findByRole(Role.ADMIN);
    }


    @PreAuthorize("hasRole('SUPERADMIN')")
    @PutMapping("/updateAdmin/{id}")
    public Users updateAdmin(@PathVariable Long id, @RequestBody Users users){
        return userService.updateAdmin(id,users);
    }

    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    @GetMapping("/AllUsers")
    public List<Users> getAllSubUsersForAdmin() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users admin = userRepo.findByUsername(username);
        return userService.getAllSubUsers(admin.getId());
    }

    @PreAuthorize("hasRole('SUPERADMIN')")
    @DeleteMapping("/deleteAdmin/{id}")
    public void deleteAdmin(@PathVariable Long id){
        userService.deleteAdmin(id);
    }

    @PostMapping("/login")
    public String verify(@RequestBody Users users){
        return userService.verify(users);
    }





}
