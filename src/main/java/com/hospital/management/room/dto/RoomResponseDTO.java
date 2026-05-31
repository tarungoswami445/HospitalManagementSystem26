package com.hospital.management.room.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomResponseDTO {

    private Long id;

    private String roomNumber;
    private String roomType;
    private Integer floorNumber;
    private Double pricePerDay;
    private String status;
}