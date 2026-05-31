package com.hospital.management.doctor.dto;

import lombok.Data;

@Data
public class DoctorRequestDTO {

    private String specialization;
    private String qualification;
    private Integer experienceYears;
    private Double consultationFee;

    private Long userId;
    private Long departmentId;
}