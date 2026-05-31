package com.hospital.management.bed.serviceimpl;

import com.hospital.management.bed.dto.BedRequestDTO;
import com.hospital.management.bed.dto.BedResponseDTO;
import com.hospital.management.bed.entity.Bed;
import com.hospital.management.bed.repository.BedRepository;
import com.hospital.management.bed.service.BedService;
import com.hospital.management.room.entity.Room;
import com.hospital.management.room.repository.RoomRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BedServiceImpl implements BedService {

    @Autowired
    private BedRepository bedRepository;

    @Autowired
    private RoomRepository roomRepository;

    // CREATE
    @Override
    public BedResponseDTO saveBed(BedRequestDTO dto) {

        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        Bed bed = new Bed();
        bed.setBedNumber(dto.getBedNumber());
        bed.setStatus(dto.getStatus());
        bed.setRoom(room);

        Bed saved = bedRepository.save(bed);

        return mapToDTO(saved);
    }

    // GET ALL
    @Override
    public List<BedResponseDTO> getAllBeds() {

        return bedRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // GET BY ID
    @Override
    public BedResponseDTO getBedById(Long id) {

        Bed bed = bedRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bed not found"));

        return mapToDTO(bed);
    }

    // UPDATE
    @Override
    public BedResponseDTO updateBed(Long id, BedRequestDTO dto) {

        Bed bed = bedRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bed not found"));

        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        bed.setBedNumber(dto.getBedNumber());
        bed.setStatus(dto.getStatus());
        bed.setRoom(room);

        Bed updated = bedRepository.save(bed);

        return mapToDTO(updated);
    }

    // DELETE
    @Override
    public void deleteBed(Long id) {

        if (!bedRepository.existsById(id)) {
            throw new RuntimeException("Bed not found");
        }

        bedRepository.deleteById(id);
    }

    // MAPPER
    private BedResponseDTO mapToDTO(Bed bed) {

        return new BedResponseDTO(
                bed.getId(),
                bed.getBedNumber(),
                bed.getStatus(),
                bed.getRoom().getId(),
                bed.getRoom().getRoomNumber()
        );
    }
}