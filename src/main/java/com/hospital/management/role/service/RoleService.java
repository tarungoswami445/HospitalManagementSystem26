package com.hospital.management.role.service;

import com.hospital.management.role.entity.Role;
import java.util.List;

public interface RoleService {

    Role saveRole(Role role);

    List<Role> getAllRoles();

    Role getRoleById(Long id);

    Role updateRole(Long id, Role role);

    void deleteRole(Long id);
}