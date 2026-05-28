package com.hospital.management.emergency.controller;

import com.hospital.management.emergency.entity.EmergencyRequest;
import com.hospital.management.emergency.service.EmergencyRequestService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emergency-requests")
@RequiredArgsConstructor
@CrossOrigin("*")

public class EmergencyRequestController {

    private final EmergencyRequestService service;

    @PostMapping
    public EmergencyRequest saveEmergencyRequest(
            @RequestBody EmergencyRequest request
    ) {

        return service.saveEmergencyRequest(request);
    }

    @GetMapping
    public List<EmergencyRequest> getAllEmergencyRequests() {

        return service.getAllEmergencyRequests();
    }
}