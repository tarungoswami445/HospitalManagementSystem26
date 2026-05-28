package com.hospital.management.auth.service;

import com.hospital.management.auth.dto.LoginRequest;
import com.hospital.management.auth.dto.LoginResponse;
import com.hospital.management.auth.dto.RegisterRequest;

public interface AuthService {

    LoginResponse login(LoginRequest request);

    LoginResponse registerPatient(RegisterRequest request);
    LoginResponse registerDoctor(RegisterRequest request);
}
