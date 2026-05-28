package com.hospital.management.admission.service;

import com.hospital.management.admission.entity.Admission;

import java.util.List;

public interface AdmissionService {

    Admission saveAdmission(Admission admission);

    List<Admission> getAllAdmissions();

    Admission getAdmissionById(Long id);

    Admission updateAdmission(Long id,
                              Admission admission);

    void deleteAdmission(Long id);
}