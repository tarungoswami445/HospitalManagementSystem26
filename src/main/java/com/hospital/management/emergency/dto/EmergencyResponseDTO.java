package com.hospital.management.emergency.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmergencyResponseDTO {

    private Long id;

    private Long patientId;
    private String patientName;

    private String emergencyLevel;

    private String message;

    private String status;

    private LocalDateTime createdAt;
}