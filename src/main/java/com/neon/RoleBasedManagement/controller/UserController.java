package com.neon.RoleBasedManagement.controller;

import com.neon.RoleBasedManagement.model.Users;
import com.neon.RoleBasedManagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public Users register(@RequestBody Users users){
        return userService.register(users);
    }

    @GetMapping("/users")
    public List<Users> users(){
        return userService.users();
    }

    @PostMapping("/login")
    public String verify(@RequestBody Users users){
        return userService.verify(users);
    }


}
