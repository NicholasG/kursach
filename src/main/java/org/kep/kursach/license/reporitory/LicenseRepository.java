package org.kep.kursach.license.reporitory;

import org.kep.kursach.license.domain.LicenseInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Created by NicholasG on 05.03.2016.
 */
public interface LicenseRepository extends JpaRepository<LicenseInfo, Long> {

    Optional<LicenseInfo> findOneById(Long id);

    Optional<LicenseInfo> findOneByName(String name);

}
