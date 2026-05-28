package com.hospital.management.emergency.repository;

import com.hospital.management.emergency.entity.EmergencyRequest;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmergencyRequestRepository
        extends JpaRepository<EmergencyRequest, Long> {
}