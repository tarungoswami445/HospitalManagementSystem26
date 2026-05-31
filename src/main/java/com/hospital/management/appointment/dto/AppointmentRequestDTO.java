package com.hospital.management.appointment.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class AppointmentRequestDTO {

    private LocalDate appointmentDate;
    private LocalTime appointmentTime;

    private String status;
    private String symptoms;
    private Integer tokenNumber;

    private Long patientId;
    private Long doctorId;
}