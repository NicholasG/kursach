package org.kep.kursach.software.reporitory;

import org.kep.kursach.software.domain.SoftwareInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Created by NicholasG on 05.03.2016.
 */
public interface SoftwareRepository extends JpaRepository<SoftwareInfo, Long> {

    Optional<SoftwareInfo> findOneById(Long id);

}
