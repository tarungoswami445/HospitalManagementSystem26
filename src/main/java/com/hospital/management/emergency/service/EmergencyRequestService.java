package com.hospital.management.emergency.service;
import java.util.List;

import com.hospital.management.emergency.dto.EmergencyRequestDTO;
import com.hospital.management.emergency.dto.EmergencyResponseDTO;

public interface EmergencyRequestService {

    EmergencyResponseDTO saveEmergencyRequest(EmergencyRequestDTO dto);

    List<EmergencyResponseDTO> getAllEmergencyRequests();

    EmergencyResponseDTO updateEmergencyRequest(Long id, EmergencyRequestDTO dto);

    void deleteEmergencyRequest(Long id);
}