package com.hospital.management.admission.controller;

import com.hospital.management.admission.entity.Admission;
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

    // Save Admission
    @PostMapping
    public Admission saveAdmission(
            @RequestBody Admission admission) {

        return admissionService.saveAdmission(admission);
    }

    // Get All Admissions
    @GetMapping
    public List<Admission> getAllAdmissions() {

        return admissionService.getAllAdmissions();
    }

    // Get Admission By Id
    @GetMapping("/{id}")
    public Admission getAdmissionById(
            @PathVariable Long id) {

        return admissionService.getAdmissionById(id);
    }

    // Update Admission
    @PutMapping("/{id}")
    public Admission updateAdmission(
            @PathVariable Long id,
            @RequestBody Admission admission) {

        return admissionService
                .updateAdmission(id, admission);
    }

    // Delete Admission
    @DeleteMapping("/{id}")
    public String deleteAdmission(
            @PathVariable Long id) {

        admissionService.deleteAdmission(id);

        return "Admission deleted successfully";
    }
}