package com.shopping.app.controller;

import com.shopping.app.model.Role;
import com.shopping.app.security.UserPrinciple;
import com.shopping.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PutMapping("change/{role}")
    public ResponseEntity<?> changeRole(@AuthenticationPrincipal UserPrinciple userPrinciple,
                                        @PathVariable Role role) {
        userService.changeRole(role, userPrinciple.getUsername());

        return ResponseEntity.ok(true);
    }
}
