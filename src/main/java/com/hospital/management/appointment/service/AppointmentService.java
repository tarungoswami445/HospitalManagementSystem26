package com.hospital.management.appointment.service;

import com.hospital.management.appointment.entity.Appointment;

import java.util.List;

public interface AppointmentService {

    Appointment saveAppointment(Appointment appointment);

    List<Appointment> getAllAppointments();

    Appointment getAppointmentById(Long id);

    Appointment updateAppointment(Long id,
                                  Appointment appointment);

    void deleteAppointment(Long id);
}