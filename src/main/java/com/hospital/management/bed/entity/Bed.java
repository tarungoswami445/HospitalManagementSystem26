package com.hospital.management.bed.entity;

import com.hospital.management.room.entity.Room;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "beds")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Bed {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bedNumber;

    private String status;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;
}