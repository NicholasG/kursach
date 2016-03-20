package org.kep.kursach.software.reporitory;

import org.kep.kursach.software.domain.SoftwareInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.stream.Stream;

/**
 * Created by NicholasG on 05.03.2016.
 */
public interface SoftwareRepository extends JpaRepository<SoftwareInfo, Long> {

    @Query(value = "SELECT s FROM SoftwareInfo s WHERE UPPER(s.developer.name) LIKE UPPER(:name)")
    Stream<SoftwareInfo> findByDeveloperName(@Param("name") String name);

    Optional<SoftwareInfo> findOneById(Long id);

}
