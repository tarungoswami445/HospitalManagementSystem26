package com.hospital.management.prescription.service;

import com.hospital.management.prescription.entity.Prescription;

import java.util.List;

public interface PrescriptionService {

    Prescription savePrescription(
            Prescription prescription);

    List<Prescription> getAllPrescriptions();

    Prescription getPrescriptionById(Long id);

    Prescription updatePrescription(
            Long id,
            Prescription prescription);

    void deletePrescription(Long id);
}