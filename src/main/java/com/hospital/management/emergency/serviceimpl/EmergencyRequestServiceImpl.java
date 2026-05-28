package com.hospital.management.emergency.serviceimpl;

import com.hospital.management.emergency.entity.EmergencyRequest;
import com.hospital.management.emergency.repository.EmergencyRequestRepository;
import com.hospital.management.emergency.service.EmergencyRequestService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor

public class EmergencyRequestServiceImpl
        implements EmergencyRequestService {

    private final EmergencyRequestRepository repository;

    @Override
    public EmergencyRequest saveEmergencyRequest(
            EmergencyRequest request
    ) {

        request.setCreatedAt(LocalDateTime.now());

        return repository.save(request);
    }

    @Override
    public List<EmergencyRequest> getAllEmergencyRequests() {

        return repository.findAll();
    }
}