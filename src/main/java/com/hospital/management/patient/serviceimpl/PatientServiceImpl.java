package com.hospital.management.patient.serviceimpl;

import com.hospital.management.patient.dto.PatientRequestDTO;
import com.hospital.management.patient.dto.PatientResponseDTO;
import com.hospital.management.patient.entity.Patient;
import com.hospital.management.patient.repository.PatientRepository;

import com.hospital.management.user.entity.User;
import com.hospital.management.user.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PatientServiceImpl implements com.hospital.management.patient.service.PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private UserRepository userRepository;

    // CREATE
    @Override
    public PatientResponseDTO savePatient(PatientRequestDTO dto) {

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Patient patient = new Patient();
        patient.setAge(dto.getAge());
        patient.setGender(dto.getGender());
        patient.setBloodGroup(dto.getBloodGroup());
        patient.setAddress(dto.getAddress());
        patient.setDisease(dto.getDisease());
        patient.setUser(user);

        Patient saved = patientRepository.save(patient);

        return mapToDTO(saved);
    }

    // GET ALL
    @Override
    public List<PatientResponseDTO> getAllPatients() {

        return patientRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // GET BY ID
    @Override
    public PatientResponseDTO getPatientById(Long id) {

        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        return mapToDTO(patient);
    }

    // UPDATE
    @Override
    public PatientResponseDTO updatePatient(Long id, PatientRequestDTO dto) {

        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        patient.setAge(dto.getAge());
        patient.setGender(dto.getGender());
        patient.setBloodGroup(dto.getBloodGroup());
        patient.setAddress(dto.getAddress());
        patient.setDisease(dto.getDisease());
        patient.setUser(user);

        Patient updated = patientRepository.save(patient);

        return mapToDTO(updated);
    }

    // DELETE
    @Override
    public void deletePatient(Long id) {

        if (!patientRepository.existsById(id)) {
            throw new RuntimeException("Patient not found");
        }

        patientRepository.deleteById(id);
    }

    // MAPPER
    private PatientResponseDTO mapToDTO(Patient p) {

        return new PatientResponseDTO(
                p.getId(),
                p.getAge(),
                p.getGender(),
                p.getBloodGroup(),
                p.getAddress(),
                p.getDisease(),
                p.getUser().getId(),
                p.getUser().getFullName()
        );
    }
}