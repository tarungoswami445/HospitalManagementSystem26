package com.hospital.management.prescription.controller;

import com.hospital.management.prescription.dto.*;
import com.hospital.management.prescription.service.PrescriptionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prescriptions")
@CrossOrigin("*")
public class PrescriptionController {

    @Autowired
    private PrescriptionService prescriptionService;

    @PostMapping
    public PrescriptionResponseDTO save(@RequestBody PrescriptionRequestDTO dto) {
        return prescriptionService.savePrescription(dto);
    }

    @GetMapping
    public List<PrescriptionResponseDTO> getAll() {
        return prescriptionService.getAllPrescriptions();
    }

    @GetMapping("/{id}")
    public PrescriptionResponseDTO getById(@PathVariable Long id) {
        return prescriptionService.getPrescriptionById(id);
    }

    @PutMapping("/{id}")
    public PrescriptionResponseDTO update(
            @PathVariable Long id,
            @RequestBody PrescriptionRequestDTO dto) {

        return prescriptionService.updatePrescription(id, dto);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        prescriptionService.deletePrescription(id);
        return "Prescription deleted successfully";
    }
}