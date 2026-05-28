package com.hospital.management.medicalrecord.controller;

import com.hospital.management.medicalrecord.entity.MedicalRecord;
import com.hospital.management.medicalrecord.service.MedicalRecordService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medical-records")
@CrossOrigin("*")

public class MedicalRecordController {

    @Autowired
    private MedicalRecordService medicalRecordService;

    // Save Medical Record
    @PostMapping
    public MedicalRecord saveMedicalRecord(
            @RequestBody MedicalRecord medicalRecord) {

        return medicalRecordService
                .saveMedicalRecord(medicalRecord);
    }

    // Get All Medical Records
    @GetMapping
    public List<MedicalRecord> getAllMedicalRecords() {

        return medicalRecordService
                .getAllMedicalRecords();
    }

    // Get Medical Record By Id
    @GetMapping("/{id}")
    public MedicalRecord getMedicalRecordById(
            @PathVariable Long id) {

        return medicalRecordService
                .getMedicalRecordById(id);
    }

    // Update Medical Record
    @PutMapping("/{id}")
    public MedicalRecord updateMedicalRecord(
            @PathVariable Long id,
            @RequestBody MedicalRecord medicalRecord) {

        return medicalRecordService
                .updateMedicalRecord(id, medicalRecord);
    }

    // Delete Medical Record
    @DeleteMapping("/{id}")
    public String deleteMedicalRecord(
            @PathVariable Long id) {

        medicalRecordService.deleteMedicalRecord(id);

        return "Medical Record deleted successfully";
    }
}