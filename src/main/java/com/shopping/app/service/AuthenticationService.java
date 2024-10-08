package com.shopping.app.service;

import com.shopping.app.model.User;

public interface AuthenticationService {
    User signInAndReturnJWT(User signInRequest);
}
