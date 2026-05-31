package com.hospital.management.patient.dto;

import lombok.Data;

@Data
public class PatientRequestDTO {

    private Integer age;
    private String gender;
    private String bloodGroup;
    private String address;
    private String disease;

    private Long userId;
}