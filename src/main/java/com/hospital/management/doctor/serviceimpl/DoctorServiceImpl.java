package com.hospital.management.doctor.serviceimpl;

import com.hospital.management.department.entity.Department;
import com.hospital.management.department.repository.DepartmentRepository;
import com.hospital.management.doctor.entity.Doctor;
import com.hospital.management.doctor.repository.DoctorRepository;
import com.hospital.management.doctor.service.DoctorService;
import com.hospital.management.user.entity.User;
import com.hospital.management.user.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Override
    public Doctor saveDoctor(Doctor doctor) {

        Long userId = doctor.getUser().getId();

        User user = userRepository.findById(userId).orElse(null);

        Long departmentId = doctor.getDepartment().getId();

        Department department =
                departmentRepository.findById(departmentId).orElse(null);

        doctor.setUser(user);

        doctor.setDepartment(department);

        return doctorRepository.save(doctor);
    }

    @Override
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @Override
    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id).orElse(null);
    }

    @Override
    public Doctor updateDoctor(Long id, Doctor doctor) {

        Doctor existingDoctor =
                doctorRepository.findById(id).orElse(null);

        if (existingDoctor != null) {

            existingDoctor.setSpecialization(
                    doctor.getSpecialization());

            existingDoctor.setQualification(
                    doctor.getQualification());

            existingDoctor.setExperienceYears(
                    doctor.getExperienceYears());

            existingDoctor.setConsultationFee(
                    doctor.getConsultationFee());

            existingDoctor.setUser(
                    doctor.getUser());

            existingDoctor.setDepartment(
                    doctor.getDepartment());

            return doctorRepository.save(existingDoctor);
        }

        return null;
    }

    @Override
    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }
}