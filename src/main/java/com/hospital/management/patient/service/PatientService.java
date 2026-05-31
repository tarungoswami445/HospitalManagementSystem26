package com.hospital.management.patient.service;

import com.hospital.management.patient.dto.PatientRequestDTO;
import com.hospital.management.patient.dto.PatientResponseDTO;

import java.util.List;

public interface PatientService {

    PatientResponseDTO savePatient(PatientRequestDTO dto);

    List<PatientResponseDTO> getAllPatients();

    PatientResponseDTO getPatientById(Long id);

    PatientResponseDTO updatePatient(Long id, PatientRequestDTO dto);

    void deletePatient(Long id);
}