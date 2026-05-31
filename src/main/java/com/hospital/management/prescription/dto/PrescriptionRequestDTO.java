package com.hospital.management.prescription.dto;

import lombok.Data;

@Data
public class PrescriptionRequestDTO {

    private String doctorNotes;
    private String medicines;

    private Long appointmentId;
}