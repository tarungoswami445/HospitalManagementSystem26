package com.hospital.management.department.serviceimpl;

import com.hospital.management.department.dto.DepartmentRequestDTO;
import com.hospital.management.department.dto.DepartmentResponseDTO;
import com.hospital.management.department.entity.Department;
import com.hospital.management.department.repository.DepartmentRepository;
import com.hospital.management.department.service.DepartmentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    private DepartmentRepository repository;

    // CREATE
    @Override
    public DepartmentResponseDTO saveDepartment(DepartmentRequestDTO dto) {

        Department dept = new Department();
        dept.setDepartmentName(dto.getDepartmentName());
        dept.setDescription(dto.getDescription());

        Department saved = repository.save(dept);

        return mapToDTO(saved);
    }

    // GET ALL
    @Override
    public List<DepartmentResponseDTO> getAllDepartments() {

        return repository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // GET BY ID
    @Override
    public DepartmentResponseDTO getDepartmentById(Long id) {

        Department dept = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found"));

        return mapToDTO(dept);
    }

    // UPDATE
    @Override
    public DepartmentResponseDTO updateDepartment(Long id, DepartmentRequestDTO dto) {

        Department dept = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found"));

        dept.setDepartmentName(dto.getDepartmentName());
        dept.setDescription(dto.getDescription());

        Department updated = repository.save(dept);

        return mapToDTO(updated);
    }

    // DELETE
    @Override
    public void deleteDepartment(Long id) {

        if (!repository.existsById(id)) {
            throw new RuntimeException("Department not found");
        }

        repository.deleteById(id);
    }

    // MAPPER
    private DepartmentResponseDTO mapToDTO(Department dept) {
        return new DepartmentResponseDTO(
                dept.getId(),
                dept.getDepartmentName(),
                dept.getDescription()
        );
    }
}