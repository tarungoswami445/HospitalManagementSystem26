package com.hospital.management.user.service;

import com.hospital.management.user.entity.User;

import java.util.List;

public interface UserService {
    User registerUser(User user);
    User findByEmail(String email);

    User saveUser(User user);

    List<User> getAllUsers();

    User getUserById(Long id);

    User updateUser(Long id, User user);

    void deleteUser(Long id);
}