package com.hospital.management.medicalrecord.dto;

import lombok.Data;

@Data
public class MedicalRecordRequestDTO {

    private String diagnosis;
    private String treatment;
    private String allergies;

    private Long patientId;
}