package com.hospital.management.room.serviceimpl;

import com.hospital.management.room.dto.RoomRequestDTO;
import com.hospital.management.room.dto.RoomResponseDTO;
import com.hospital.management.room.entity.Room;
import com.hospital.management.room.repository.RoomRepository;
import com.hospital.management.room.service.RoomService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    private RoomRepository roomRepository;

    // CREATE
    @Override
    public RoomResponseDTO saveRoom(RoomRequestDTO dto) {

        Room room = new Room();
        room.setRoomNumber(dto.getRoomNumber());
        room.setRoomType(dto.getRoomType());
        room.setFloorNumber(dto.getFloorNumber());
        room.setPricePerDay(dto.getPricePerDay());
        room.setStatus(dto.getStatus());

        Room saved = roomRepository.save(room);

        return mapToDTO(saved);
    }

    // GET ALL
    @Override
    public List<RoomResponseDTO> getAllRooms() {

        return roomRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // GET BY ID
    @Override
    public RoomResponseDTO getRoomById(Long id) {

        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        return mapToDTO(room);
    }

    // UPDATE
    @Override
    public RoomResponseDTO updateRoom(Long id, RoomRequestDTO dto) {

        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        room.setRoomNumber(dto.getRoomNumber());
        room.setRoomType(dto.getRoomType());
        room.setFloorNumber(dto.getFloorNumber());
        room.setPricePerDay(dto.getPricePerDay());
        room.setStatus(dto.getStatus());

        Room updated = roomRepository.save(room);

        return mapToDTO(updated);
    }

    // DELETE
    @Override
    public void deleteRoom(Long id) {

        if (!roomRepository.existsById(id)) {
            throw new RuntimeException("Room not found");
        }

        roomRepository.deleteById(id);
    }

    // MAPPER
    private RoomResponseDTO mapToDTO(Room room) {

        return new RoomResponseDTO(
                room.getId(),
                room.getRoomNumber(),
                room.getRoomType(),
                room.getFloorNumber(),
                room.getPricePerDay(),
                room.getStatus()
        );
    }
}