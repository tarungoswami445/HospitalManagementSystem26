package com.hospital.management.admission.serviceimpl;

import com.hospital.management.admission.entity.Admission;
import com.hospital.management.admission.repository.AdmissionRepository;
import com.hospital.management.admission.service.AdmissionService;

import com.hospital.management.patient.entity.Patient;
import com.hospital.management.patient.repository.PatientRepository;

import com.hospital.management.doctor.entity.Doctor;
import com.hospital.management.doctor.repository.DoctorRepository;

import com.hospital.management.room.entity.Room;
import com.hospital.management.room.repository.RoomRepository;

import com.hospital.management.bed.entity.Bed;
import com.hospital.management.bed.repository.BedRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdmissionServiceImpl
        implements AdmissionService {

    @Autowired
    private AdmissionRepository admissionRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private BedRepository bedRepository;

    @Override
    public Admission saveAdmission(
            Admission admission) {

        Long patientId =
                admission.getPatient().getId();

        Patient patient =
                patientRepository.findById(patientId)
                        .orElse(null);

        Long doctorId =
                admission.getDoctor().getId();

        Doctor doctor =
                doctorRepository.findById(doctorId)
                        .orElse(null);

        Long roomId =
                admission.getRoom().getId();

        Room room =
                roomRepository.findById(roomId)
                        .orElse(null);

        Long bedId =
                admission.getBed().getId();

        Bed bed =
                bedRepository.findById(bedId)
                        .orElse(null);

        admission.setPatient(patient);
        admission.setDoctor(doctor);
        admission.setRoom(room);
        admission.setBed(bed);

        return admissionRepository.save(admission);
    }

    @Override
    public List<Admission> getAllAdmissions() {

        return admissionRepository.findAll();
    }

    @Override
    public Admission getAdmissionById(Long id) {

        return admissionRepository.findById(id)
                .orElse(null);
    }

    @Override
    public Admission updateAdmission(
            Long id,
            Admission admission) {

        Admission existingAdmission =
                admissionRepository.findById(id)
                        .orElse(null);

        if (existingAdmission != null) {

            existingAdmission.setAdmitDate(
                    admission.getAdmitDate());

            existingAdmission.setDischargeDate(
                    admission.getDischargeDate());

            existingAdmission.setStatus(
                    admission.getStatus());

            existingAdmission.setPatient(
                    admission.getPatient());

            existingAdmission.setDoctor(
                    admission.getDoctor());

            existingAdmission.setRoom(
                    admission.getRoom());

            existingAdmission.setBed(
                    admission.getBed());

            return admissionRepository
                    .save(existingAdmission);
        }

        return null;
    }

    @Override
    public void deleteAdmission(Long id) {

        admissionRepository.deleteById(id);
    }
}