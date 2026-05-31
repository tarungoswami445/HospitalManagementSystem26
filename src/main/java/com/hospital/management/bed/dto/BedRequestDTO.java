package com.hospital.management.bed.dto;

import lombok.Data;

@Data
public class BedRequestDTO {

    private String bedNumber;
    private String status;

    private Long roomId;
}