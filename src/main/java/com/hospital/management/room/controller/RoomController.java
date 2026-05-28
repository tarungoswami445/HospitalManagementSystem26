package com.hospital.management.room.controller;

import com.hospital.management.room.entity.Room;
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

    // Save Room
    @PostMapping
    public Room saveRoom(
            @RequestBody Room room) {

        return roomService.saveRoom(room);
    }

    // Get All Rooms
    @GetMapping
    public List<Room> getAllRooms() {

        return roomService.getAllRooms();
    }

    // Get Room By Id
    @GetMapping("/{id}")
    public Room getRoomById(
            @PathVariable Long id) {

        return roomService.getRoomById(id);
    }

    // Update Room
    @PutMapping("/{id}")
    public Room updateRoom(
            @PathVariable Long id,
            @RequestBody Room room) {

        return roomService
                .updateRoom(id, room);
    }

    // Delete Room
    @DeleteMapping("/{id}")
    public String deleteRoom(
            @PathVariable Long id) {

        roomService.deleteRoom(id);

        return "Room deleted successfully";
    }
}