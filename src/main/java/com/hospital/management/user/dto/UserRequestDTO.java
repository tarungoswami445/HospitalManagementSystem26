package com.hospital.management.user.dto;

import lombok.Data;

@Data
public class UserRequestDTO {

    private String fullName;
    private String email;
    private String password;
    private String phone;

    private Long roleId;
}