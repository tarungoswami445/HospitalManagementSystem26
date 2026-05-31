package com.hospital.management.emergency.dto;

import lombok.Data;

@Data
public class EmergencyRequestDTO {

    private Long patientId;

    private String emergencyLevel; 
    // LOW / MEDIUM / HIGH / CRITICAL

    private String message;

    private String status;
    // PENDING / RESPONDED / CLOSED
}