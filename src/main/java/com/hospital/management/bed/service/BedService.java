package com.hospital.management.bed.service;

import com.hospital.management.bed.dto.BedRequestDTO;
import com.hospital.management.bed.dto.BedResponseDTO;

import java.util.List;

public interface BedService {

    BedResponseDTO saveBed(BedRequestDTO dto);

    List<BedResponseDTO> getAllBeds();

    BedResponseDTO getBedById(Long id);

    BedResponseDTO updateBed(Long id, BedRequestDTO dto);

    void deleteBed(Long id);
}