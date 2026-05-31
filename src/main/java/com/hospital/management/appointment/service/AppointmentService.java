package com.hospital.management.appointment.service;

import com.hospital.management.appointment.dto.AppointmentRequestDTO;
import com.hospital.management.appointment.dto.AppointmentResponseDTO;

import java.util.List;

public interface AppointmentService {

    AppointmentResponseDTO saveAppointment(AppointmentRequestDTO dto);

    List<AppointmentResponseDTO> getAllAppointments();

    AppointmentResponseDTO getAppointmentById(Long id);

    AppointmentResponseDTO updateAppointment(Long id, AppointmentRequestDTO dto);

    void deleteAppointment(Long id);
}