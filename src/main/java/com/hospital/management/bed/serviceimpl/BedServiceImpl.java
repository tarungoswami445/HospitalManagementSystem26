package com.hospital.management.bed.serviceimpl;

import com.hospital.management.bed.entity.Bed;
import com.hospital.management.bed.repository.BedRepository;
import com.hospital.management.bed.service.BedService;

import com.hospital.management.room.entity.Room;
import com.hospital.management.room.repository.RoomRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BedServiceImpl
        implements BedService {

    @Autowired
    private BedRepository bedRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Override
    public Bed saveBed(Bed bed) {

        Long roomId =
                bed.getRoom().getId();

        Room room =
                roomRepository.findById(roomId)
                        .orElse(null);

        bed.setRoom(room);

        return bedRepository.save(bed);
    }

    @Override
    public List<Bed> getAllBeds() {

        return bedRepository.findAll();
    }

    @Override
    public Bed getBedById(Long id) {

        return bedRepository.findById(id)
                .orElse(null);
    }

    @Override
    public Bed updateBed(Long id,
                         Bed bed) {

        Bed existingBed =
                bedRepository.findById(id)
                        .orElse(null);

        if (existingBed != null) {

            existingBed.setBedNumber(
                    bed.getBedNumber());

            existingBed.setStatus(
                    bed.getStatus());

            existingBed.setRoom(
                    bed.getRoom());

            return bedRepository.save(existingBed);
        }

        return null;
    }

    @Override
    public void deleteBed(Long id) {

        bedRepository.deleteById(id);
    }
}