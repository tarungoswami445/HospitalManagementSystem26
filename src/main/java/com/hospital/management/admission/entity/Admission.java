package com.hospital.management.admission.entity;

import com.hospital.management.patient.entity.Patient;
import com.hospital.management.doctor.entity.Doctor;
import com.hospital.management.room.entity.Room;
import com.hospital.management.bed.entity.Bed;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "admissions")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Admission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate admitDate;

    private LocalDate dischargeDate;

    private String status;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @ManyToOne
    @JoinColumn(name = "bed_id")
    private Bed bed;
}