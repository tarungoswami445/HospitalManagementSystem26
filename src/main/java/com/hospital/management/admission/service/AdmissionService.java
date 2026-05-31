package com.hospital.management.admission.service;

import com.hospital.management.admission.dto.AdmissionRequestDTO;
import com.hospital.management.admission.dto.AdmissionResponseDTO;

import java.util.List;

public interface AdmissionService {

    AdmissionResponseDTO saveAdmission(AdmissionRequestDTO dto);

    List<AdmissionResponseDTO> getAllAdmissions();

    AdmissionResponseDTO getAdmissionById(Long id);

    AdmissionResponseDTO updateAdmission(Long id, AdmissionRequestDTO dto);

    void deleteAdmission(Long id);
}