package com.hospital.management.patient.serviceimpl;

import com.hospital.management.patient.entity.Patient;
import com.hospital.management.patient.repository.PatientRepository;
import com.hospital.management.patient.service.PatientService;
import com.hospital.management.user.entity.User;
import com.hospital.management.user.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Patient savePatient(Patient patient) {

        Long userId = patient.getUser().getId();

        User user = userRepository.findById(userId).orElse(null);

        patient.setUser(user);

        return patientRepository.save(patient);
    }

    @Override
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    @Override
    public Patient getPatientById(Long id) {
        return patientRepository.findById(id).orElse(null);
    }

    @Override
    public Patient updatePatient(Long id, Patient patient) {

        Patient existingPatient = patientRepository.findById(id).orElse(null);

        if (existingPatient != null) {

            existingPatient.setAge(patient.getAge());
            existingPatient.setGender(patient.getGender());
            existingPatient.setBloodGroup(patient.getBloodGroup());
            existingPatient.setAddress(patient.getAddress());
            existingPatient.setDisease(patient.getDisease());
            existingPatient.setUser(patient.getUser());

            return patientRepository.save(existingPatient);
        }

        return null;
    }

    @Override
    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
}