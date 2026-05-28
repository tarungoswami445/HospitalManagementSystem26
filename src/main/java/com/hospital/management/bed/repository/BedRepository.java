package com.hospital.management.bed.repository;

import com.hospital.management.bed.entity.Bed;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BedRepository
        extends JpaRepository<Bed, Long> {

}