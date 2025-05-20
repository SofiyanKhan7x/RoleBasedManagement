package com.neon.RoleBasedManagement.repository;

import com.neon.RoleBasedManagement.enums.Role;
import com.neon.RoleBasedManagement.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<Users,Long> {
    Users findByUsername(String username);
    List<Users> findByRole(Role role);
    Optional<Users> findById(Long id);
}
