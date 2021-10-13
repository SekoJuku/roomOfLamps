package kz.lamps.repository;

import kz.lamps.model.Lamp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LampRepository extends JpaRepository<Lamp, Integer> {
    List<Lamp> findAllByCountry(String country);
}
