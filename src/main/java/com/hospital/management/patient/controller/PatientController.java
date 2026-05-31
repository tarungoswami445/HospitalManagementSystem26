package com.hospital.management.patient.controller;

import com.hospital.management.patient.dto.PatientRequestDTO;
import com.hospital.management.patient.dto.PatientResponseDTO;
import com.hospital.management.patient.service.PatientService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin("*")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @PostMapping
    public PatientResponseDTO save(@RequestBody PatientRequestDTO dto) {
        return patientService.savePatient(dto);
    }

    @GetMapping
    public List<PatientResponseDTO> getAll() {
        return patientService.getAllPatients();
    }

    @GetMapping("/{id}")
    public PatientResponseDTO getById(@PathVariable Long id) {
        return patientService.getPatientById(id);
    }

    @PutMapping("/{id}")
    public PatientResponseDTO update(
            @PathVariable Long id,
            @RequestBody PatientRequestDTO dto) {

        return patientService.updatePatient(id, dto);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        patientService.deletePatient(id);
        return "Patient deleted successfully";
    }
}