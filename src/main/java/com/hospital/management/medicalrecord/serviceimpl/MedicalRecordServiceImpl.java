package com.hospital.management.medicalrecord.serviceimpl;

import com.hospital.management.medicalrecord.dto.MedicalRecordRequestDTO;
import com.hospital.management.medicalrecord.dto.MedicalRecordResponseDTO;
import com.hospital.management.medicalrecord.entity.MedicalRecord;
import com.hospital.management.medicalrecord.repository.MedicalRecordRepository;
import com.hospital.management.medicalrecord.service.MedicalRecordService;
import com.hospital.management.patient.entity.Patient;
import com.hospital.management.patient.repository.PatientRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MedicalRecordServiceImpl implements MedicalRecordService {

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    @Autowired
    private PatientRepository patientRepository;

    // CREATE
    @Override
    public MedicalRecordResponseDTO saveMedicalRecord(MedicalRecordRequestDTO dto) {

        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        MedicalRecord record = new MedicalRecord();
        record.setDiagnosis(dto.getDiagnosis());
        record.setTreatment(dto.getTreatment());
        record.setAllergies(dto.getAllergies());
        record.setPatient(patient);

        MedicalRecord saved = medicalRecordRepository.save(record);

        return mapToDTO(saved);
    }

    // GET ALL
    @Override
    public List<MedicalRecordResponseDTO> getAllMedicalRecords() {

        return medicalRecordRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // GET BY ID
    @Override
    public MedicalRecordResponseDTO getMedicalRecordById(Long id) {

        MedicalRecord record = medicalRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medical Record not found"));

        return mapToDTO(record);
    }

    // UPDATE
    @Override
    public MedicalRecordResponseDTO updateMedicalRecord(Long id, MedicalRecordRequestDTO dto) {

        MedicalRecord record = medicalRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medical Record not found"));

        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        record.setDiagnosis(dto.getDiagnosis());
        record.setTreatment(dto.getTreatment());
        record.setAllergies(dto.getAllergies());
        record.setPatient(patient);

        MedicalRecord updated = medicalRecordRepository.save(record);

        return mapToDTO(updated);
    }

    // DELETE
    @Override
    public void deleteMedicalRecord(Long id) {

        if (!medicalRecordRepository.existsById(id)) {
            throw new RuntimeException("Medical Record not found");
        }

        medicalRecordRepository.deleteById(id);
    }

    // MAPPER
    private MedicalRecordResponseDTO mapToDTO(MedicalRecord r) {

        return new MedicalRecordResponseDTO(
                r.getId(),
                r.getDiagnosis(),
                r.getTreatment(),
                r.getAllergies(),
                r.getCreatedAt(),
                r.getPatient().getId(),
                r.getPatient().getUser().getFullName()
        );
    }
}