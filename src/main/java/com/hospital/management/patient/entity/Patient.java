package com.hospital.management.patient.entity;

import com.hospital.management.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "patients")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer age;

    private String gender;

    private String bloodGroup;

    private String address;

    private String disease;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}