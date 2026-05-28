package com.hospital.management.appointment.serviceimpl;

import com.hospital.management.appointment.entity.Appointment;
import com.hospital.management.appointment.repository.AppointmentRepository;
import com.hospital.management.appointment.service.AppointmentService;

import com.hospital.management.doctor.entity.Doctor;
import com.hospital.management.doctor.repository.DoctorRepository;

import com.hospital.management.patient.entity.Patient;
import com.hospital.management.patient.repository.PatientRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentServiceImpl
        implements AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public Appointment saveAppointment(
            Appointment appointment) {

        Long patientId =
                appointment.getPatient().getId();

        Patient patient =
                patientRepository.findById(patientId)
                        .orElse(null);

        Long doctorId =
                appointment.getDoctor().getId();

        Doctor doctor =
                doctorRepository.findById(doctorId)
                        .orElse(null);

        appointment.setPatient(patient);

        appointment.setDoctor(doctor);

        return appointmentRepository.save(appointment);
    }

    @Override
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    @Override
    public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id)
                .orElse(null);
    }

    @Override
    public Appointment updateAppointment(
            Long id,
            Appointment appointment) {

        Appointment existingAppointment =
                appointmentRepository.findById(id)
                        .orElse(null);

        if (existingAppointment != null) {

            existingAppointment.setAppointmentDate(
                    appointment.getAppointmentDate());

            existingAppointment.setAppointmentTime(
                    appointment.getAppointmentTime());

            existingAppointment.setStatus(
                    appointment.getStatus());

            existingAppointment.setSymptoms(
                    appointment.getSymptoms());

            existingAppointment.setTokenNumber(
                    appointment.getTokenNumber());

            existingAppointment.setPatient(
                    appointment.getPatient());

            existingAppointment.setDoctor(
                    appointment.getDoctor());

            return appointmentRepository
                    .save(existingAppointment);
        }

        return null;
    }

    @Override
    public void deleteAppointment(Long id) {

        appointmentRepository.deleteById(id);
    }
}