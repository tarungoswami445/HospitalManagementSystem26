package com.hospital.management.doctor.controller;

import com.hospital.management.doctor.dto.DoctorRequestDTO;
import com.hospital.management.doctor.dto.DoctorResponseDTO;
import com.hospital.management.doctor.service.DoctorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin("*")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    // CREATE
    @PostMapping
    public DoctorResponseDTO saveDoctor(@RequestBody DoctorRequestDTO dto) {
        return doctorService.saveDoctor(dto);
    }

    // GET ALL (dropdown + table)
    @GetMapping
    public List<DoctorResponseDTO> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public DoctorResponseDTO getDoctorById(@PathVariable Long id) {
        return doctorService.getDoctorById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public DoctorResponseDTO updateDoctor(
            @PathVariable Long id,
            @RequestBody DoctorRequestDTO dto) {

        return doctorService.updateDoctor(id, dto);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteDoctor(@PathVariable Long id) {
        doctorService.deleteDoctor(id);
        return "Doctor deleted successfully";
    }
}