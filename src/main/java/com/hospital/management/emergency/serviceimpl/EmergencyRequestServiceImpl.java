package com.hospital.management.emergency.serviceimpl;

import com.hospital.management.emergency.dto.*;
import com.hospital.management.emergency.entity.EmergencyRequest;
import com.hospital.management.emergency.repository.EmergencyRequestRepository;
import com.hospital.management.emergency.service.EmergencyRequestService;
import com.hospital.management.patient.entity.Patient;
import com.hospital.management.patient.repository.PatientRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmergencyRequestServiceImpl implements EmergencyRequestService {

    @Autowired
    private EmergencyRequestRepository repository;

    @Autowired
    private PatientRepository patientRepository;

    // CREATE
    @Override
    public EmergencyResponseDTO saveEmergencyRequest(EmergencyRequestDTO dto) {

        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        EmergencyRequest req = new EmergencyRequest();
        req.setPatientId(patient.getId());
        req.setEmergencyLevel(dto.getEmergencyLevel());
        req.setMessage(dto.getMessage());
        req.setStatus(dto.getStatus());
        req.setCreatedAt(LocalDateTime.now());

        EmergencyRequest saved = repository.save(req);

        return mapToDTO(saved, patient);
    }

    // GET ALL
    @Override
    public List<EmergencyResponseDTO> getAllEmergencyRequests() {

        return repository.findAll()
                .stream()
                .map(req -> {

                    Patient patient = patientRepository.findById(req.getPatientId())
                            .orElse(null);

                    return mapToDTO(req, patient);
                })
                .collect(Collectors.toList());
    }
    @Override
public void deleteEmergencyRequest(Long id) {

    repository.deleteById(id);
}
@Override
public EmergencyResponseDTO updateEmergencyRequest(
        Long id,
        EmergencyRequestDTO dto) {

    EmergencyRequest request = repository.findById(id)
            .orElseThrow(() ->
                    new RuntimeException("Emergency Request Not Found"));

    Patient patient = patientRepository.findById(dto.getPatientId())
            .orElseThrow(() ->
                    new RuntimeException("Patient Not Found"));

    request.setPatientId(patient.getId());
    request.setEmergencyLevel(dto.getEmergencyLevel());
    request.setMessage(dto.getMessage());
    request.setStatus(dto.getStatus());

    EmergencyRequest updated = repository.save(request);

    return mapToDTO(updated, patient);
}

    // MAPPER
    private EmergencyResponseDTO mapToDTO(EmergencyRequest req, Patient patient) {

        return new EmergencyResponseDTO(
                req.getId(),
                req.getPatientId(),
                patient != null ? patient.getUser().getFullName() : "Unknown",
                req.getEmergencyLevel(),
                req.getMessage(),
                req.getStatus(),
                req.getCreatedAt()
        );
    }
}