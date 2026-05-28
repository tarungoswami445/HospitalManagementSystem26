package com.hospital.management.prescription.entity;

import com.hospital.management.appointment.entity.Appointment;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "prescriptions")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String doctorNotes;

    private String medicines;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;

    @PrePersist
    public void createdAt() {
        this.createdAt = LocalDateTime.now();
    }
}