package com.hospital.management.medicalrecord.repository;

import com.hospital.management.medicalrecord.entity.MedicalRecord;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicalRecordRepository
        extends JpaRepository<MedicalRecord, Long> {

}