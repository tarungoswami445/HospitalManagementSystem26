package com.hospital.management.user.serviceimpl;

import com.hospital.management.role.repository.RoleRepository;
import com.hospital.management.user.entity.User;
import com.hospital.management.user.repository.UserRepository;
import com.hospital.management.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hospital.management.role.entity.Role;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

@Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

@Override
public User saveUser(User user) {

    Long roleId = user.getRole().getId();

    Role role = roleRepository.findById(roleId).orElse(null);

    user.setRole(role);

    return userRepository.save(user);
}

  

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User updateUser(Long id, User user) {

        User existingUser = userRepository.findById(id).orElse(null);

        if (existingUser != null) {

            existingUser.setFullName(user.getFullName());
            existingUser.setEmail(user.getEmail());
            existingUser.setPassword(user.getPassword());
            existingUser.setPhone(user.getPhone());
            existingUser.setRole(user.getRole());

            return userRepository.save(existingUser);
        }

        return null;
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User registerUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
}