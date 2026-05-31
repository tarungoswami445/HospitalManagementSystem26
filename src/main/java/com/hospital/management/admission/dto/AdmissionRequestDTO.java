package com.hospital.management.admission.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AdmissionRequestDTO {

    private LocalDate admitDate;
    private LocalDate dischargeDate;
    private String status;

    private Long patientId;
    private Long doctorId;
    private Long roomId;
    private Long bedId;
}