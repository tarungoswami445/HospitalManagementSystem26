package com.hospital.management.appointment.controller;

import com.hospital.management.appointment.dto.AppointmentRequestDTO;
import com.hospital.management.appointment.dto.AppointmentResponseDTO;
import com.hospital.management.appointment.service.AppointmentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin("*")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping
    public AppointmentResponseDTO save(@RequestBody AppointmentRequestDTO dto) {
        return appointmentService.saveAppointment(dto);
    }

    @GetMapping
    public List<AppointmentResponseDTO> getAll() {
        return appointmentService.getAllAppointments();
    }

    @GetMapping("/{id}")
    public AppointmentResponseDTO getById(@PathVariable Long id) {
        return appointmentService.getAppointmentById(id);
    }

    @PutMapping("/{id}")
    public AppointmentResponseDTO update(
            @PathVariable Long id,
            @RequestBody AppointmentRequestDTO dto) {

        return appointmentService.updateAppointment(id, dto);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
        return "Appointment deleted successfully";
    }
}