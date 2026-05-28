package com.hospital.management.medicalrecord.service;

import com.hospital.management.medicalrecord.entity.MedicalRecord;

import java.util.List;

public interface MedicalRecordService {

    MedicalRecord saveMedicalRecord(
            MedicalRecord medicalRecord);

    List<MedicalRecord> getAllMedicalRecords();

    MedicalRecord getMedicalRecordById(Long id);

    MedicalRecord updateMedicalRecord(
            Long id,
            MedicalRecord medicalRecord);

    void deleteMedicalRecord(Long id);
}