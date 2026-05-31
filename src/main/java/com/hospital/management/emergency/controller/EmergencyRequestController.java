package com.hospital.management.emergency.controller;

import com.hospital.management.emergency.dto.EmergencyRequestDTO;
import com.hospital.management.emergency.dto.EmergencyResponseDTO;

import com.hospital.management.emergency.serviceimpl.EmergencyRequestServiceImpl;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emergency-requests")
@RequiredArgsConstructor
@CrossOrigin("*")
public class EmergencyRequestController {

    private final EmergencyRequestServiceImpl service;

    @PostMapping
    public EmergencyResponseDTO save(@RequestBody EmergencyRequestDTO dto) {
        return service.saveEmergencyRequest(dto);
    }

    @GetMapping
    public List<EmergencyResponseDTO> getAll() {
        return service.getAllEmergencyRequests();
    }
    @PutMapping("/{id}")
public EmergencyResponseDTO update(
        @PathVariable Long id,
        @RequestBody EmergencyRequestDTO dto) {

    return service.updateEmergencyRequest(id, dto);
}
    
@DeleteMapping("/{id}")
public String delete(@PathVariable Long id) {

    service.deleteEmergencyRequest(id);

    return "Emergency Request Deleted Successfully";
}
}