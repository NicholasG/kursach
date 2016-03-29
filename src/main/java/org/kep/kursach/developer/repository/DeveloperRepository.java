package org.kep.kursach.developer.repository;

import org.kep.kursach.developer.domain.DeveloperInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

/**
 * Created by NicholasG on 05.03.2016.
 */
public interface DeveloperRepository extends JpaRepository<DeveloperInfo, Long> {

    Optional<DeveloperInfo> findOneById( Long id );

    Optional<DeveloperInfo> findOneByName( String name );

    @Query( "SELECT d FROM DeveloperInfo d " +
            "WHERE UPPER(d.name) LIKE UPPER(:name) " +
            "AND UPPER(d.country) LIKE UPPER(:country) " )
    Page<DeveloperInfo> findAllByNameAndCountry(
            Pageable pageable,
            @Param( "name" ) String name,
            @Param( "country" ) String country );
}
