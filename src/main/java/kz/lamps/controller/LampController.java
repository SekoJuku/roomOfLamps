package kz.lamps.controller;

import kz.lamps.dto.LampDtoRequest;
import kz.lamps.model.Lamp;
import kz.lamps.service.LampService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Log
@RequestMapping("/api/lamp")
public class LampController {
    @Autowired
    private LampService lampService;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll() {
        try {
            List<Lamp> results = lampService.getAll();
            log.info(String.valueOf(results));
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            log.info(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("")
    public ResponseEntity<?> lightLamp(@RequestBody LampDtoRequest request) {
        try {
            Lamp result = lampService.lightLamp(request.getId());
            log.info(String.valueOf(result));
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.info(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Integer id) {
        try {
            Lamp result = lampService.getById(id);
            log.info(String.valueOf(result));
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.info(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createLamp(@RequestBody LampDtoRequest request) {
        try {
            Lamp result = lampService.createLamp(request.getName(), request.getCountry());
            log.info(String.valueOf(result));
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.info(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
}
