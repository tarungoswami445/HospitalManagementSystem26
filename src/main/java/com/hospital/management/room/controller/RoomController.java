package com.hospital.management.room.controller;

import com.hospital.management.room.dto.RoomRequestDTO;
import com.hospital.management.room.dto.RoomResponseDTO;
import com.hospital.management.room.service.RoomService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin("*")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping
    public RoomResponseDTO save(@RequestBody RoomRequestDTO dto) {
        return roomService.saveRoom(dto);
    }

    @GetMapping
    public List<RoomResponseDTO> getAll() {
        return roomService.getAllRooms();
    }

    @GetMapping("/{id}")
    public RoomResponseDTO getById(@PathVariable Long id) {
        return roomService.getRoomById(id);
    }

    @PutMapping("/{id}")
    public RoomResponseDTO update(
            @PathVariable Long id,
            @RequestBody RoomRequestDTO dto) {

        return roomService.updateRoom(id, dto);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        roomService.deleteRoom(id);
        return "Room deleted successfully";
    }
}