package com.hospital.management.room.service;

import com.hospital.management.room.dto.RoomRequestDTO;
import com.hospital.management.room.dto.RoomResponseDTO;

import java.util.List;

public interface RoomService {

    RoomResponseDTO saveRoom(RoomRequestDTO dto);

    List<RoomResponseDTO> getAllRooms();

    RoomResponseDTO getRoomById(Long id);

    RoomResponseDTO updateRoom(Long id, RoomRequestDTO dto);

    void deleteRoom(Long id);
}