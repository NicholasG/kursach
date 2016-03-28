package org.kep.kursach.license.reporitory;

import org.kep.kursach.license.domain.LicenseInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

/**
 * Created by NicholasG on 05.03.2016.
 */
public interface LicenseRepository extends JpaRepository<LicenseInfo, Long> {

    Optional<LicenseInfo> findOneById( Long id );

    Optional<LicenseInfo> findOneByName( String name );

    @Query( "SELECT l FROM LicenseInfo l " +
            "WHERE  UPPER(l.name) LIKE UPPER(:name)" )
    Page<LicenseInfo> findOneByName( Pageable pageable, @Param( "name" ) String name );

}
