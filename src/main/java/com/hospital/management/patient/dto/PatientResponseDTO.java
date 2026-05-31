package com.hospital.management.patient.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientResponseDTO {

    private Long id;

    private Integer age;
    private String gender;
    private String bloodGroup;
    private String address;
    private String disease;

    private Long userId;
    private String userName;
}