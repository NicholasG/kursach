package org.kep.kursach.license.reporitory;

import org.kep.kursach.license.domain.LicenseInfo;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by NicholasG on 05.03.2016.
 */
public interface LicenseRepository extends JpaRepository<LicenseInfo, Long> {
}
