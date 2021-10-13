package kz.lamps;

import kz.lamps.controller.LampController;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class LampsApplicationTests {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private LampController lampController;

    @Test
    void contextLoads() throws Exception {
        assertThat(lampController).isNotNull();
    }

    @Test
    void shouldReturnData() throws Exception {
        this.mockMvc.perform(get("/api/lamp/getAll")).andDo(print()).andExpect(status().isOk());
    }
}
