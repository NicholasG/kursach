package org.kep.kursach.developer.repository;

import org.kep.kursach.developer.domain.DeveloperInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Created by NicholasG on 05.03.2016.
 */
public interface DeveloperRepository extends JpaRepository<DeveloperInfo, Long> {

    Optional<DeveloperInfo> findOneById(Long id);

    Optional<DeveloperInfo> findOneByName(String name);

}
