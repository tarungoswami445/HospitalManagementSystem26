package com.hospital.management.auth.controller;

import com.hospital.management.auth.dto.LoginRequest;
import com.hospital.management.auth.dto.LoginResponse;
import com.hospital.management.auth.service.AuthService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hospital.management.auth.dto.RegisterRequest;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor

// @CrossOrigin("*")
public class AuthController {

    private final AuthService authService;
    @PostMapping("/patient-register")
public ResponseEntity<LoginResponse> registerPatient(

        @RequestBody RegisterRequest request
) {

    return ResponseEntity.ok(
            authService.registerPatient(request)
    );
}
@PostMapping("/doctor-register")
public ResponseEntity<LoginResponse> registerDoctor(
        @RequestBody RegisterRequest request
) {

    return ResponseEntity.ok(
            authService.registerDoctor(request)
    );
}
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(

            @RequestBody LoginRequest request
    ) {

        return ResponseEntity.ok(
                authService.login(request)
        );
    }
}