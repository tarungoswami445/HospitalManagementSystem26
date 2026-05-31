package com.hospital.management.user.service;

import com.hospital.management.user.dto.UserRequestDTO;
import com.hospital.management.user.dto.UserResponseDTO;

import java.util.List;

public interface UserService {

    UserResponseDTO saveUser(UserRequestDTO dto);

    List<UserResponseDTO> getAllUsers();

    UserResponseDTO getUserById(Long id);

    UserResponseDTO updateUser(Long id, UserRequestDTO dto);

    void deleteUser(Long id);

    UserResponseDTO findByEmail(String email);
}