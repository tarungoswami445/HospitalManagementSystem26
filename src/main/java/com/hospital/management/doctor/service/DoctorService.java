package com.hospital.management.doctor.service;

import com.hospital.management.doctor.dto.DoctorRequestDTO;
import com.hospital.management.doctor.dto.DoctorResponseDTO;

import java.util.List;

public interface DoctorService {

    DoctorResponseDTO saveDoctor(DoctorRequestDTO dto);

    List<DoctorResponseDTO> getAllDoctors();

    DoctorResponseDTO getDoctorById(Long id);

    DoctorResponseDTO updateDoctor(Long id, DoctorRequestDTO dto);

    void deleteDoctor(Long id);
}