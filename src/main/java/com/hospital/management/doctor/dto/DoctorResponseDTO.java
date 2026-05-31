package com.hospital.management.doctor.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorResponseDTO {

    private Long id;

    private String specialization;
    private String qualification;
    private Integer experienceYears;
    private Double consultationFee;

    private Long userId;
    private String userName;

    private Long departmentId;
    private String departmentName;
}