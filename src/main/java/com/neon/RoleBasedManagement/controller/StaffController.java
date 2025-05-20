package com.neon.RoleBasedManagement.controller;

import com.neon.RoleBasedManagement.model.Users;
import com.neon.RoleBasedManagement.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StaffController {

    @Autowired
    private StaffService staffService;

    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    @PostMapping("/addStaff")
    public Users addStaff(@RequestBody Users users){
        return staffService.addStaff(users);
    }
}
