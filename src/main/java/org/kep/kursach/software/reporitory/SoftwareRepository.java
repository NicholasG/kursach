package org.kep.kursach.software.reporitory;

import org.kep.kursach.software.domain.SoftwareInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.Optional;

/**
 * Created by NicholasG on 05.03.2016.
 */
public interface SoftwareRepository extends JpaRepository<SoftwareInfo, Long> {

    Optional<SoftwareInfo> findOneById( Long id );

    @Query( "SELECT s FROM SoftwareInfo s " +
            "WHERE UPPER(s.name) LIKE UPPER(:name) " +
            "AND UPPER(s.developer.name) LIKE UPPER(:devName) " +
            "AND UPPER(s.license.name) LIKE UPPER(:licName)" )
    Page<SoftwareInfo> findAllByNameAndDeveloperNameAndLicenseName(
            Pageable pageable,
            @Param( "name" ) String name,
            @Param( "devName" ) String devName,
            @Param( "licName" ) String licName );

    @Query( "SELECT s FROM SoftwareInfo s " +
            "WHERE UPPER(s.name) LIKE UPPER(:name) " +
            "AND s.release = :release " +
            "AND UPPER(s.developer.name) LIKE UPPER(:devName) " +
            "AND UPPER(s.license.name) LIKE UPPER(:licName)" )
    Page<SoftwareInfo> findAllByNameAndReleaseAndDeveloperNameAndLicenseName(
            Pageable pageable,
            @Param( "name" ) String name,
            @Param( "release" ) Date release,
            @Param( "devName" ) String devName,
            @Param( "licName" ) String licName );
}
