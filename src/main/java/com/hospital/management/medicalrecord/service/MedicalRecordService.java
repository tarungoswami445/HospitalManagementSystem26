package com.hospital.management.medicalrecord.service;

import com.hospital.management.medicalrecord.dto.MedicalRecordRequestDTO;
import com.hospital.management.medicalrecord.dto.MedicalRecordResponseDTO;

import java.util.List;

public interface MedicalRecordService {

    MedicalRecordResponseDTO saveMedicalRecord(MedicalRecordRequestDTO dto);

    List<MedicalRecordResponseDTO> getAllMedicalRecords();

    MedicalRecordResponseDTO getMedicalRecordById(Long id);

    MedicalRecordResponseDTO updateMedicalRecord(Long id, MedicalRecordRequestDTO dto);

    void deleteMedicalRecord(Long id);
}