package org.kep.kursach.developer.repository;

import org.kep.kursach.developer.domain.DeveloperInfo;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by NicholasG on 05.03.2016.
 */
public interface DeveloperRepository extends JpaRepository<DeveloperInfo, Long> {
}
