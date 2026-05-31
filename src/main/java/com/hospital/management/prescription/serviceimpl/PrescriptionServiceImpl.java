package com.hospital.management.prescription.serviceimpl;

import com.hospital.management.prescription.dto.*;
import com.hospital.management.prescription.entity.Prescription;
import com.hospital.management.prescription.repository.PrescriptionRepository;
import com.hospital.management.prescription.service.PrescriptionService;
import com.hospital.management.appointment.entity.Appointment;
import com.hospital.management.appointment.repository.AppointmentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PrescriptionServiceImpl implements PrescriptionService {

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    // CREATE
    @Override
    public PrescriptionResponseDTO savePrescription(PrescriptionRequestDTO dto) {

        Appointment appointment = appointmentRepository.findById(dto.getAppointmentId())
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        Prescription p = new Prescription();
        p.setDoctorNotes(dto.getDoctorNotes());
        p.setMedicines(dto.getMedicines());
        p.setAppointment(appointment);

        Prescription saved = prescriptionRepository.save(p);

        return mapToDTO(saved);
    }

    // GET ALL
    @Override
    public List<PrescriptionResponseDTO> getAllPrescriptions() {

        return prescriptionRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // GET BY ID
    @Override
    public PrescriptionResponseDTO getPrescriptionById(Long id) {

        Prescription p = prescriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescription not found"));

        return mapToDTO(p);
    }

    // UPDATE
    @Override
    public PrescriptionResponseDTO updatePrescription(Long id, PrescriptionRequestDTO dto) {

        Prescription p = prescriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescription not found"));

        Appointment appointment = appointmentRepository.findById(dto.getAppointmentId())
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        p.setDoctorNotes(dto.getDoctorNotes());
        p.setMedicines(dto.getMedicines());
        p.setAppointment(appointment);

        return mapToDTO(prescriptionRepository.save(p));
    }

    // DELETE
    @Override
    public void deletePrescription(Long id) {

        if (!prescriptionRepository.existsById(id)) {
            throw new RuntimeException("Prescription not found");
        }

        prescriptionRepository.deleteById(id);
    }

    // MAPPER
    private PrescriptionResponseDTO mapToDTO(Prescription p) {

        Appointment a = p.getAppointment();

        return new PrescriptionResponseDTO(
                p.getId(),
                p.getDoctorNotes(),
                p.getMedicines(),
                p.getCreatedAt(),
                a.getId(),
                a.getPatient().getId(),
                a.getPatient().getUser().getFullName(),
                a.getDoctor().getId(),
                a.getDoctor().getUser().getFullName()
        );
    }
}