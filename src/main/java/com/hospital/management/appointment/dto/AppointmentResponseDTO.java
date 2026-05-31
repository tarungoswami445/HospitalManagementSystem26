package com.hospital.management.appointment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentResponseDTO {

    private Long id;

    private LocalDate appointmentDate;
    private LocalTime appointmentTime;

    private String status;
    private String symptoms;
    private Integer tokenNumber;

    private LocalDateTime createdAt;

    private Long patientId;
    private String patientName;

    private Long doctorId;
    private String doctorName;
}