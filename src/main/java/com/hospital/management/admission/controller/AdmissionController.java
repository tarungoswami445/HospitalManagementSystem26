package com.hospital.management.admission.controller;

import com.hospital.management.admission.dto.AdmissionRequestDTO;
import com.hospital.management.admission.dto.AdmissionResponseDTO;
import com.hospital.management.admission.service.AdmissionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admissions")
@CrossOrigin("*")
public class AdmissionController {

    @Autowired
    private AdmissionService admissionService;

    @PostMapping
    public AdmissionResponseDTO save(@RequestBody AdmissionRequestDTO dto) {
        return admissionService.saveAdmission(dto);
    }

    @GetMapping
    public List<AdmissionResponseDTO> getAll() {
        return admissionService.getAllAdmissions();
    }

    @GetMapping("/{id}")
    public AdmissionResponseDTO getById(@PathVariable Long id) {
        return admissionService.getAdmissionById(id);
    }

    @PutMapping("/{id}")
    public AdmissionResponseDTO update(
            @PathVariable Long id,
            @RequestBody AdmissionRequestDTO dto) {

        return admissionService.updateAdmission(id, dto);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        admissionService.deleteAdmission(id);
        return "Admission deleted successfully";
    }
}