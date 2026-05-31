package com.hospital.management.bed.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BedResponseDTO {

    private Long id;

    private String bedNumber;
    private String status;

    private Long roomId;
    private String roomNumber;
}