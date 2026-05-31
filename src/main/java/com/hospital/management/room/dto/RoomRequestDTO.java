package com.hospital.management.room.dto;

import lombok.Data;

@Data
public class RoomRequestDTO {

    private String roomNumber;
    private String roomType;
    private Integer floorNumber;
    private Double pricePerDay;
    private String status;
}