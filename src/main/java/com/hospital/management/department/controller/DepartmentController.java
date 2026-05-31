package com.hospital.management.department.controller;

import com.hospital.management.department.dto.DepartmentRequestDTO;
import com.hospital.management.department.dto.DepartmentResponseDTO;
import com.hospital.management.department.service.DepartmentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@CrossOrigin("*")
public class DepartmentController {

    @Autowired
    private DepartmentService service;

    // CREATE
    @PostMapping
    public DepartmentResponseDTO create(@RequestBody DepartmentRequestDTO dto) {
        return service.saveDepartment(dto);
    }

    // GET ALL (FOR DROPDOWN)
    @GetMapping
    public List<DepartmentResponseDTO> getAll() {
        return service.getAllDepartments();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public DepartmentResponseDTO getById(@PathVariable Long id) {
        return service.getDepartmentById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public DepartmentResponseDTO update(
            @PathVariable Long id,
            @RequestBody DepartmentRequestDTO dto) {

        return service.updateDepartment(id, dto);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.deleteDepartment(id);
        return "Department deleted successfully";
    }
}