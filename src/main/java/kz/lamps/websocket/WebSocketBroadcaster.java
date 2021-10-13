package kz.lamps.websocket;

import kz.lamps.model.Lamp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class WebSocketBroadcaster {
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    private final static String INSERT_DEST = "/ws/insert";

    public void insertWaiting(Lamp lamp) {
        simpMessagingTemplate.convertAndSend(INSERT_DEST, lamp);
    }
}