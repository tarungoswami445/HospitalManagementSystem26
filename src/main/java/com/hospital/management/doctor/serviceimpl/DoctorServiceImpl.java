package com.hospital.management.doctor.serviceimpl;

import com.hospital.management.department.entity.Department;
import com.hospital.management.department.repository.DepartmentRepository;
import com.hospital.management.doctor.dto.DoctorRequestDTO;
import com.hospital.management.doctor.dto.DoctorResponseDTO;
import com.hospital.management.doctor.entity.Doctor;
import com.hospital.management.doctor.repository.DoctorRepository;
import com.hospital.management.doctor.service.DoctorService;
import com.hospital.management.user.entity.User;
import com.hospital.management.user.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    // CREATE
    @Override
    public DoctorResponseDTO saveDoctor(DoctorRequestDTO dto) {

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Department department = departmentRepository.findById(dto.getDepartmentId())
                .orElseThrow(() -> new RuntimeException("Department not found"));

        Doctor doctor = new Doctor();
        doctor.setSpecialization(dto.getSpecialization());
        doctor.setQualification(dto.getQualification());
        doctor.setExperienceYears(dto.getExperienceYears());
        doctor.setConsultationFee(dto.getConsultationFee());
        doctor.setUser(user);
        doctor.setDepartment(department);

        Doctor saved = doctorRepository.save(doctor);

        return mapToDTO(saved);
    }

    // GET ALL
    @Override
    public List<DoctorResponseDTO> getAllDoctors() {

        return doctorRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // GET BY ID
    @Override
    public DoctorResponseDTO getDoctorById(Long id) {

        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        return mapToDTO(doctor);
    }

    // UPDATE
    @Override
    public DoctorResponseDTO updateDoctor(Long id, DoctorRequestDTO dto) {

        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Department department = departmentRepository.findById(dto.getDepartmentId())
                .orElseThrow(() -> new RuntimeException("Department not found"));

        doctor.setSpecialization(dto.getSpecialization());
        doctor.setQualification(dto.getQualification());
        doctor.setExperienceYears(dto.getExperienceYears());
        doctor.setConsultationFee(dto.getConsultationFee());
        doctor.setUser(user);
        doctor.setDepartment(department);

        Doctor updated = doctorRepository.save(doctor);

        return mapToDTO(updated);
    }

    // DELETE
    @Override
    public void deleteDoctor(Long id) {

        if (!doctorRepository.existsById(id)) {
            throw new RuntimeException("Doctor not found");
        }

        doctorRepository.deleteById(id);
    }

    // MAPPER
    private DoctorResponseDTO mapToDTO(Doctor doctor) {

        return new DoctorResponseDTO(
                doctor.getId(),
                doctor.getSpecialization(),
                doctor.getQualification(),
                doctor.getExperienceYears(),
                doctor.getConsultationFee(),
                doctor.getUser().getId(),
                doctor.getUser().getFullName(),
                doctor.getDepartment().getId(),
                doctor.getDepartment().getDepartmentName()
        );
    }
}