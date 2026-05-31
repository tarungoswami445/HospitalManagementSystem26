package com.hospital.management.medicalrecord.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MedicalRecordResponseDTO {

    private Long id;

    private String diagnosis;
    private String treatment;
    private String allergies;

    private LocalDateTime createdAt;

    private Long patientId;
    private String patientName;
}