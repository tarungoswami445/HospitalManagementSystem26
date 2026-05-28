package com.hospital.management.bed.service;

import com.hospital.management.bed.entity.Bed;

import java.util.List;

public interface BedService {

    Bed saveBed(Bed bed);

    List<Bed> getAllBeds();

    Bed getBedById(Long id);

    Bed updateBed(Long id, Bed bed);

    void deleteBed(Long id);
}