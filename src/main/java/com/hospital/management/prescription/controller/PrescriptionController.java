package com.hospital.management.prescription.controller;

import com.hospital.management.prescription.entity.Prescription;
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

    // Save Prescription
    @PostMapping
    public Prescription savePrescription(
            @RequestBody Prescription prescription) {

        return prescriptionService
                .savePrescription(prescription);
    }

    // Get All Prescriptions
    @GetMapping
    public List<Prescription> getAllPrescriptions() {

        return prescriptionService
                .getAllPrescriptions();
    }

    // Get Prescription By Id
    @GetMapping("/{id}")
    public Prescription getPrescriptionById(
            @PathVariable Long id) {

        return prescriptionService
                .getPrescriptionById(id);
    }

    // Update Prescription
    @PutMapping("/{id}")
    public Prescription updatePrescription(
            @PathVariable Long id,
            @RequestBody Prescription prescription) {

        return prescriptionService
                .updatePrescription(id, prescription);
    }

    // Delete Prescription
    @DeleteMapping("/{id}")
    public String deletePrescription(
            @PathVariable Long id) {

        prescriptionService.deletePrescription(id);

        return "Prescription deleted successfully";
    }
}