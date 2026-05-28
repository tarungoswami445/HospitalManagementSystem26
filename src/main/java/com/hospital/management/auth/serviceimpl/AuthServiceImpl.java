package com.hospital.management.auth.serviceimpl;

import com.hospital.management.auth.dto.LoginRequest;
import com.hospital.management.auth.dto.LoginResponse;
import com.hospital.management.auth.dto.RegisterRequest;
import com.hospital.management.auth.service.AuthService;

import com.hospital.management.security.JwtService;

import com.hospital.management.user.entity.User;
import com.hospital.management.user.repository.UserRepository;

import com.hospital.management.role.entity.Role;
import com.hospital.management.role.repository.RoleRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    // ================= LOGIN =================

    @Override
    public LoginResponse login(LoginRequest request) {

        try {

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );

            User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            UserDetails userDetails =
                    userDetailsService.loadUserByUsername(user.getEmail());

            String token = jwtService.generateToken(userDetails);

            return new LoginResponse(
                    token,
                    user.getRole().getRoleName(),
                    user.getFullName()
            );

        } catch (Exception e) {

            throw new RuntimeException("Invalid email or password");
        }
    }

    // ================= REGISTER PATIENT =================

    @Override
    public LoginResponse registerPatient(RegisterRequest request) {

        // CHECK EMAIL EXISTS
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {

            throw new RuntimeException("Email already exists");
        }

        // GET PATIENT ROLE
        Role role = roleRepository.findByRoleName("PATIENT")
                .orElseThrow(() -> new RuntimeException("Role not found"));

        // CREATE USER
        User user = new User();

        user.setFullName(request.getFullName());

        user.setEmail(request.getEmail());

        user.setPhone(request.getPhone());

        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        user.setRole(role);

        // SAVE USER
        userRepository.save(user);

        // LOAD USER DETAILS
        UserDetails userDetails =
                userDetailsService.loadUserByUsername(user.getEmail());

        // GENERATE TOKEN
        String token = jwtService.generateToken(userDetails);

        return new LoginResponse(
                token,
                role.getRoleName(),
                user.getFullName()
        );
    }
    @Override
public LoginResponse registerDoctor(RegisterRequest request) {

    // CHECK EMAIL
    if (userRepository.findByEmail(request.getEmail()).isPresent()) {

        throw new RuntimeException("Email already exists");
    }

    // GET DOCTOR ROLE
    Role role = roleRepository.findByRoleName("DOCTOR")
            .orElseThrow(() -> new RuntimeException("Role not found"));

    // CREATE USER
    User user = new User();

    user.setFullName(request.getFullName());

    user.setEmail(request.getEmail());

    user.setPhone(request.getPhone());

    user.setPassword(
            passwordEncoder.encode(request.getPassword())
    );

    user.setRole(role);

    // SAVE
    userRepository.save(user);

    // USER DETAILS
    UserDetails userDetails =
            userDetailsService.loadUserByUsername(user.getEmail());

    // TOKEN
    String token = jwtService.generateToken(userDetails);

    return new LoginResponse(
            token,
            role.getRoleName(),
            user.getFullName()
    );
}
}