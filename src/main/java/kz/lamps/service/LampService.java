package kz.lamps.service;

import kz.lamps.dto.LampDtoRequest;
import kz.lamps.model.Lamp;
import kz.lamps.repository.LampRepository;
import kz.lamps.websocket.WebSocketBroadcaster;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LampService {
    @Autowired
    private LampRepository lampRepository;
    @Autowired
    private WebSocketBroadcaster webSocketBroadcaster;

    public List<Lamp> getAll() {
        return lampRepository.findAll();
    }

    public Lamp lightLamp(Integer id) {
        Lamp lamp = lampRepository.findById(id).get();
        lamp.setIsOn(!lamp.getIsOn());
        webSocketBroadcaster.insertWaiting(lamp);
        return lampRepository.save(lamp);
    }

    public Lamp createLamp(String name, String country) {
        Lamp lamp = new Lamp();
        lamp.setName(name);
        lamp.setCountry(country);
        lamp.setIsOn(Boolean.FALSE);
        return lampRepository.save(lamp);
    }

    public Lamp getById(Integer id) {
        return lampRepository.findById(id).get();
    }
}
