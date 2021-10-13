package kz.lamps.dto;

import lombok.Data;

@Data
public class LampDtoRequest {
    private Integer id;
    private String name;
    private String country;
    private Boolean isOn;
}
