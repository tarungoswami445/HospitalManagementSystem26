package com.hospital.management.admission.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdmissionResponseDTO {

    private Long id;

    private LocalDate admitDate;
    private LocalDate dischargeDate;
    private String status;

    private Long patientId;
    private String patientName;

    private Long doctorId;
    private String doctorName;

    private Long roomId;
    private String roomNumber;

    private Long bedId;
    private String bedNumber;
}