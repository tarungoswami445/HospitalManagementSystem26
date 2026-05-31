package com.hospital.management.bed.controller;

import com.hospital.management.bed.dto.BedRequestDTO;
import com.hospital.management.bed.dto.BedResponseDTO;
import com.hospital.management.bed.service.BedService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/beds")
@CrossOrigin("*")
public class BedController {

    @Autowired
    private BedService bedService;

    @PostMapping
    public BedResponseDTO save(@RequestBody BedRequestDTO dto) {
        return bedService.saveBed(dto);
    }

    @GetMapping
    public List<BedResponseDTO> getAll() {
        return bedService.getAllBeds();
    }

    @GetMapping("/{id}")
    public BedResponseDTO getById(@PathVariable Long id) {
        return bedService.getBedById(id);
    }

    @PutMapping("/{id}")
    public BedResponseDTO update(
            @PathVariable Long id,
            @RequestBody BedRequestDTO dto) {

        return bedService.updateBed(id, dto);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        bedService.deleteBed(id);
        return "Bed deleted successfully";
    }
}