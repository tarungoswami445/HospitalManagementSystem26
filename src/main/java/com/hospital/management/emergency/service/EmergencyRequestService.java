package com.hospital.management.emergency.service;

import com.hospital.management.emergency.entity.EmergencyRequest;

import java.util.List;

public interface EmergencyRequestService {

    EmergencyRequest saveEmergencyRequest(
            EmergencyRequest request
    );

    List<EmergencyRequest> getAllEmergencyRequests();
}