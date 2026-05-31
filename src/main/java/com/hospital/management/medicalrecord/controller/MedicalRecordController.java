package com.hospital.management.medicalrecord.controller;

import com.hospital.management.medicalrecord.dto.MedicalRecordRequestDTO;
import com.hospital.management.medicalrecord.dto.MedicalRecordResponseDTO;
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

    @PostMapping
    public MedicalRecordResponseDTO save(@RequestBody MedicalRecordRequestDTO dto) {
        return medicalRecordService.saveMedicalRecord(dto);
    }

    @GetMapping
    public List<MedicalRecordResponseDTO> getAll() {
        return medicalRecordService.getAllMedicalRecords();
    }

    @GetMapping("/{id}")
    public MedicalRecordResponseDTO getById(@PathVariable Long id) {
        return medicalRecordService.getMedicalRecordById(id);
    }

    @PutMapping("/{id}")
    public MedicalRecordResponseDTO update(
            @PathVariable Long id,
            @RequestBody MedicalRecordRequestDTO dto) {

        return medicalRecordService.updateMedicalRecord(id, dto);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        medicalRecordService.deleteMedicalRecord(id);
        return "Medical Record deleted successfully";
    }
}