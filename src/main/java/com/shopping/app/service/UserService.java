package com.shopping.app.service;

import com.shopping.app.model.Role;
import com.shopping.app.model.User;

import java.util.Optional;

public interface UserService {
    User saveUser(User user);
    Optional<User> findByUsername(String username);
    void changeRole(Role newRole, String username);
}