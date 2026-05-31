package com.hospital.management.admission.serviceimpl;

import com.hospital.management.admission.dto.AdmissionRequestDTO;
import com.hospital.management.admission.dto.AdmissionResponseDTO;
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
import java.util.stream.Collectors;

@Service
public class AdmissionServiceImpl implements AdmissionService {

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

    // CREATE
    @Override
    public AdmissionResponseDTO saveAdmission(AdmissionRequestDTO dto) {

        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        Doctor doctor = doctorRepository.findById(dto.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        Bed bed = bedRepository.findById(dto.getBedId())
                .orElseThrow(() -> new RuntimeException("Bed not found"));

        Admission admission = new Admission();
        admission.setAdmitDate(dto.getAdmitDate());
        admission.setDischargeDate(dto.getDischargeDate());
        admission.setStatus(dto.getStatus());

        admission.setPatient(patient);
        admission.setDoctor(doctor);
        admission.setRoom(room);
        admission.setBed(bed);

        Admission saved = admissionRepository.save(admission);

        return mapToDTO(saved);
    }

    // GET ALL
    @Override
    public List<AdmissionResponseDTO> getAllAdmissions() {

        return admissionRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // GET BY ID
    @Override
    public AdmissionResponseDTO getAdmissionById(Long id) {

        Admission admission = admissionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admission not found"));

        return mapToDTO(admission);
    }

    // UPDATE
    @Override
    public AdmissionResponseDTO updateAdmission(Long id, AdmissionRequestDTO dto) {

        Admission admission = admissionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admission not found"));

        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        Doctor doctor = doctorRepository.findById(dto.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        Bed bed = bedRepository.findById(dto.getBedId())
                .orElseThrow(() -> new RuntimeException("Bed not found"));

        admission.setAdmitDate(dto.getAdmitDate());
        admission.setDischargeDate(dto.getDischargeDate());
        admission.setStatus(dto.getStatus());

        admission.setPatient(patient);
        admission.setDoctor(doctor);
        admission.setRoom(room);
        admission.setBed(bed);

        Admission updated = admissionRepository.save(admission);

        return mapToDTO(updated);
    }

    // DELETE
    @Override
    public void deleteAdmission(Long id) {

        if (!admissionRepository.existsById(id)) {
            throw new RuntimeException("Admission not found");
        }

        admissionRepository.deleteById(id);
    }

    private AdmissionResponseDTO mapToDTO(Admission a) {

    return new AdmissionResponseDTO(
            a.getId(),
            a.getAdmitDate(),
            a.getDischargeDate(),
            a.getStatus(),

            a.getPatient() != null ? a.getPatient().getId() : null,
            a.getPatient() != null ? a.getPatient().getUser().getFullName() : null,

            a.getDoctor() != null ? a.getDoctor().getId() : null,
            a.getDoctor() != null ? a.getDoctor().getUser().getFullName() : null,

            a.getRoom() != null ? a.getRoom().getId() : null,
            a.getRoom() != null ? a.getRoom().getRoomNumber() : null,

            a.getBed() != null ? a.getBed().getId() : null,
            a.getBed() != null ? a.getBed().getBedNumber() : null
    );
}
}