package com.neon.RoleBasedManagement.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.neon.RoleBasedManagement.enums.Role;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

//    private boolean active;

    @ManyToOne
    @JoinColumn(name = "parent_id")
//    @JsonIgnoreProperties({ "parent"})
    private Users parent; // Who created this user

    // getters & setters
}
