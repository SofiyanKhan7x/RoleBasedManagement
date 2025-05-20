package com.neon.RoleBasedManagement.controller;

import com.neon.RoleBasedManagement.model.Users;
import com.neon.RoleBasedManagement.service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ManagerController {

    @Autowired
    private ManagerService managerService;


    //Only Admin can create the new manager
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/addManager")
    public Users addManager(@RequestBody Users users){
        return managerService.addManager(users);
    }

    //Only Admin can see the all managers
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getAllManagers")
    public List<Users> getAllManagers(){
        return managerService.getAllManagers();
    }



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


}
