package com.hospital.management.prescription.serviceimpl;

import com.hospital.management.appointment.entity.Appointment;
import com.hospital.management.appointment.repository.AppointmentRepository;

import com.hospital.management.prescription.entity.Prescription;
import com.hospital.management.prescription.repository.PrescriptionRepository;
import com.hospital.management.prescription.service.PrescriptionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrescriptionServiceImpl
        implements PrescriptionService {

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Override
    public Prescription savePrescription(
            Prescription prescription) {

        Long appointmentId =
                prescription.getAppointment().getId();

        Appointment appointment =
                appointmentRepository.findById(appointmentId)
                        .orElse(null);

        prescription.setAppointment(appointment);

        return prescriptionRepository.save(prescription);
    }

    @Override
    public List<Prescription> getAllPrescriptions() {

        return prescriptionRepository.findAll();
    }

    @Override
    public Prescription getPrescriptionById(Long id) {

        return prescriptionRepository.findById(id)
                .orElse(null);
    }

    @Override
    public Prescription updatePrescription(
            Long id,
            Prescription prescription) {

        Prescription existingPrescription =
                prescriptionRepository.findById(id)
                        .orElse(null);

        if (existingPrescription != null) {

            existingPrescription.setDoctorNotes(
                    prescription.getDoctorNotes());

            existingPrescription.setMedicines(
                    prescription.getMedicines());

            existingPrescription.setAppointment(
                    prescription.getAppointment());

            return prescriptionRepository
                    .save(existingPrescription);
        }

        return null;
    }

    @Override
    public void deletePrescription(Long id) {

        prescriptionRepository.deleteById(id);
    }
}