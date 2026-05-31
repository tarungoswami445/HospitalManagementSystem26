package com.hospital.management.appointment.serviceimpl;

import com.hospital.management.appointment.dto.AppointmentRequestDTO;
import com.hospital.management.appointment.dto.AppointmentResponseDTO;
import com.hospital.management.appointment.entity.Appointment;
import com.hospital.management.appointment.repository.AppointmentRepository;

import com.hospital.management.doctor.entity.Doctor;
import com.hospital.management.doctor.repository.DoctorRepository;

import com.hospital.management.patient.entity.Patient;
import com.hospital.management.patient.repository.PatientRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentServiceImpl implements com.hospital.management.appointment.service.AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    // CREATE
    @Override
    public AppointmentResponseDTO saveAppointment(AppointmentRequestDTO dto) {

        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        Doctor doctor = doctorRepository.findById(dto.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        Appointment appointment = new Appointment();
        appointment.setAppointmentDate(dto.getAppointmentDate());
        appointment.setAppointmentTime(dto.getAppointmentTime());
        appointment.setStatus(dto.getStatus());
        appointment.setSymptoms(dto.getSymptoms());
        appointment.setTokenNumber(dto.getTokenNumber());
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);

        Appointment saved = appointmentRepository.save(appointment);

        return mapToDTO(saved);
    }

    // GET ALL
    @Override
    public List<AppointmentResponseDTO> getAllAppointments() {

        return appointmentRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // GET BY ID
    @Override
    public AppointmentResponseDTO getAppointmentById(Long id) {

        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        return mapToDTO(appointment);
    }

    // UPDATE
    @Override
    public AppointmentResponseDTO updateAppointment(Long id, AppointmentRequestDTO dto) {

        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        Doctor doctor = doctorRepository.findById(dto.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        appointment.setAppointmentDate(dto.getAppointmentDate());
        appointment.setAppointmentTime(dto.getAppointmentTime());
        appointment.setStatus(dto.getStatus());
        appointment.setSymptoms(dto.getSymptoms());
        appointment.setTokenNumber(dto.getTokenNumber());
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);

        Appointment updated = appointmentRepository.save(appointment);

        return mapToDTO(updated);
    }

    // DELETE
    @Override
    public void deleteAppointment(Long id) {

        if (!appointmentRepository.existsById(id)) {
            throw new RuntimeException("Appointment not found");
        }

        appointmentRepository.deleteById(id);
    }

    // MAPPER
    private AppointmentResponseDTO mapToDTO(Appointment a) {

        return new AppointmentResponseDTO(
                a.getId(),
                a.getAppointmentDate(),
                a.getAppointmentTime(),
                a.getStatus(),
                a.getSymptoms(),
                a.getTokenNumber(),
                a.getCreatedAt(),
                a.getPatient().getId(),
                a.getPatient().getUser().getFullName(),
                a.getDoctor().getId(),
                a.getDoctor().getUser().getFullName()
        );
    }
}