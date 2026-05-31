package com.hospital.management.prescription.service;

import com.hospital.management.prescription.dto.PrescriptionRequestDTO;
import com.hospital.management.prescription.dto.PrescriptionResponseDTO;

import java.util.List;

public interface PrescriptionService {

    PrescriptionResponseDTO savePrescription(PrescriptionRequestDTO dto);

    List<PrescriptionResponseDTO> getAllPrescriptions();

    PrescriptionResponseDTO getPrescriptionById(Long id);

    PrescriptionResponseDTO updatePrescription(Long id, PrescriptionRequestDTO dto);

    void deletePrescription(Long id);
}