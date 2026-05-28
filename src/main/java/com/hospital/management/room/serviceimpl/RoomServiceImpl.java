package com.hospital.management.room.serviceimpl;

import com.hospital.management.room.entity.Room;
import com.hospital.management.room.repository.RoomRepository;
import com.hospital.management.room.service.RoomService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomServiceImpl
        implements RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Override
    public Room saveRoom(Room room) {

        return roomRepository.save(room);
    }

    @Override
    public List<Room> getAllRooms() {

        return roomRepository.findAll();
    }

    @Override
    public Room getRoomById(Long id) {

        return roomRepository.findById(id)
                .orElse(null);
    }

    @Override
    public Room updateRoom(Long id,
                           Room room) {

        Room existingRoom =
                roomRepository.findById(id)
                        .orElse(null);

        if (existingRoom != null) {

            existingRoom.setRoomNumber(
                    room.getRoomNumber());

            existingRoom.setRoomType(
                    room.getRoomType());

            existingRoom.setFloorNumber(
                    room.getFloorNumber());

            existingRoom.setPricePerDay(
                    room.getPricePerDay());

            existingRoom.setStatus(
                    room.getStatus());

            return roomRepository.save(existingRoom);
        }

        return null;
    }

    @Override
    public void deleteRoom(Long id) {

        roomRepository.deleteById(id);
    }
}