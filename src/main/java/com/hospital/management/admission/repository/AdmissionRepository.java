package com.hospital.management.admission.repository;

import com.hospital.management.admission.entity.Admission;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdmissionRepository
        extends JpaRepository<Admission, Long> {

}