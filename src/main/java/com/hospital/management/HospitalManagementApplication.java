package com.hospital.management;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.hospital.management.role.entity.Role;
import com.hospital.management.role.repository.RoleRepository;

@SpringBootApplication
public class HospitalManagementApplication {

	@Autowired
private RoleRepository roleRepository;

    public static void main(String[] args) {
        SpringApplication.run(HospitalManagementApplication.class, args);
    }

}