package com.hospital.management.bed.controller;

import com.hospital.management.bed.entity.Bed;
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

    // Save Bed
    @PostMapping
    public Bed saveBed(
            @RequestBody Bed bed) {

        return bedService.saveBed(bed);
    }

    // Get All Beds
    @GetMapping
    public List<Bed> getAllBeds() {

        return bedService.getAllBeds();
    }

    // Get Bed By Id
    @GetMapping("/{id}")
    public Bed getBedById(
            @PathVariable Long id) {

        return bedService.getBedById(id);
    }

    // Update Bed
    @PutMapping("/{id}")
    public Bed updateBed(
            @PathVariable Long id,
            @RequestBody Bed bed) {

        return bedService.updateBed(id, bed);
    }

    // Delete Bed
    @DeleteMapping("/{id}")
    public String deleteBed(
            @PathVariable Long id) {

        bedService.deleteBed(id);

        return "Bed deleted successfully";
    }
}