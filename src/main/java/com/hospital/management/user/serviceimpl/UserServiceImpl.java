package com.hospital.management.user.serviceimpl;

import com.hospital.management.user.dto.*;
import com.hospital.management.user.entity.User;
import com.hospital.management.user.repository.UserRepository;
import com.hospital.management.user.service.UserService;
import com.hospital.management.role.entity.Role;
import com.hospital.management.role.repository.RoleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    // CREATE
    @Override
    public UserResponseDTO saveUser(UserRequestDTO dto) {

        Role role = roleRepository.findById(dto.getRoleId())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        User user = new User();
        user.setFullName(dto.getFullName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword()); // TODO: bcrypt later
        user.setPhone(dto.getPhone());
        user.setRole(role);

        return mapToDTO(userRepository.save(user));
    }

    // GET ALL
    @Override
    public List<UserResponseDTO> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // GET BY ID
    @Override
    public UserResponseDTO getUserById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return mapToDTO(user);
    }

    // UPDATE
    @Override
    public UserResponseDTO updateUser(Long id, UserRequestDTO dto) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Role role = roleRepository.findById(dto.getRoleId())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        user.setFullName(dto.getFullName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setPhone(dto.getPhone());
        user.setRole(role);

        return mapToDTO(userRepository.save(user));
    }

    // DELETE
    @Override
    public void deleteUser(Long id) {

        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }

        userRepository.deleteById(id);
    }

    // FIND BY EMAIL
    @Override
    public UserResponseDTO findByEmail(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return mapToDTO(user);
    }

    // MAPPER
    private UserResponseDTO mapToDTO(User u) {

        return new UserResponseDTO(
                u.getId(),
                u.getFullName(),
                u.getEmail(),
                u.getPhone(),
                u.getRole().getId(),
                u.getRole().getRoleName(),
                u.getCreatedAt()
        );
    }
}