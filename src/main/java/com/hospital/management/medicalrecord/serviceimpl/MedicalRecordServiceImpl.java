package com.hospital.management.medicalrecord.serviceimpl;

import com.hospital.management.medicalrecord.entity.MedicalRecord;
import com.hospital.management.medicalrecord.repository.MedicalRecordRepository;
import com.hospital.management.medicalrecord.service.MedicalRecordService;

import com.hospital.management.patient.entity.Patient;
import com.hospital.management.patient.repository.PatientRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicalRecordServiceImpl
        implements MedicalRecordService {

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Override
    public MedicalRecord saveMedicalRecord(
            MedicalRecord medicalRecord) {

        Long patientId =
                medicalRecord.getPatient().getId();

        Patient patient =
                patientRepository.findById(patientId)
                        .orElse(null);

        medicalRecord.setPatient(patient);

        return medicalRecordRepository.save(medicalRecord);
    }

    @Override
    public List<MedicalRecord> getAllMedicalRecords() {

        return medicalRecordRepository.findAll();
    }

    @Override
    public MedicalRecord getMedicalRecordById(Long id) {

        return medicalRecordRepository.findById(id)
                .orElse(null);
    }

    @Override
    public MedicalRecord updateMedicalRecord(
            Long id,
            MedicalRecord medicalRecord) {

        MedicalRecord existingMedicalRecord =
                medicalRecordRepository.findById(id)
                        .orElse(null);

        if (existingMedicalRecord != null) {

            existingMedicalRecord.setDiagnosis(
                    medicalRecord.getDiagnosis());

            existingMedicalRecord.setTreatment(
                    medicalRecord.getTreatment());

            existingMedicalRecord.setAllergies(
                    medicalRecord.getAllergies());

            existingMedicalRecord.setPatient(
                    medicalRecord.getPatient());

            return medicalRecordRepository
                    .save(existingMedicalRecord);
        }

        return null;
    }

    @Override
    public void deleteMedicalRecord(Long id) {

        medicalRecordRepository.deleteById(id);
    }
}