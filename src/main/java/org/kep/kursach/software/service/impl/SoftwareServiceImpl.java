package org.kep.kursach.software.service.impl;

import org.kep.kursach.software.domain.SoftwareInfo;
import org.kep.kursach.software.reporitory.SoftwareRepository;
import org.kep.kursach.software.service.SoftwareService;
import org.kep.kursach.web.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.Optional;

/**
 * Created by NicholasG on 05.03.2016.
 */
@Component( "softwareService" )
public class SoftwareServiceImpl implements SoftwareService {

    private static final Logger LOG = LoggerFactory.getLogger( SoftwareServiceImpl.class );

    @Autowired
    private SoftwareRepository repository;

    @Override
    public ResponseEntity<SoftwareInfo> add( SoftwareInfo software ) {
        repository.saveAndFlush( software );
        LOG.info( "Software '{}' has been added", software.getName() );
        return ResponseEntity.ok( software );
    }

    @Override
    public ResponseEntity<SoftwareInfo> edit( SoftwareInfo software ) {
        return repository
                .findOneById( software.getId() )
                .map( s -> {
                    s.setName( software.getName() );
                    s.setVersion( software.getVersion() );
                    s.setRelease( software.getRelease() );
                    s.setDeveloper( software.getDeveloper() );
                    s.setLicense( software.getLicense() );
                    s.setWindows( software.isWindows() );
                    s.setLinux( software.isLinux() );
                    s.setMacOS( software.isMacOS() );
                    repository.saveAndFlush( s );
                    LOG.info( "Software '{}' has been edited", software.getName() );
                    return ResponseEntity.ok().body( software );
                } )
                .orElseGet( () -> new ResponseEntity( HttpStatus.INTERNAL_SERVER_ERROR ) );
    }

    @Override
    public ResponseEntity<Void> delete( Long id ) {
        Optional<SoftwareInfo> software = repository.findOneById( id );
        if ( software.isPresent() ) {
            repository.delete( software.get().getId() );
            LOG.info( "Software '{}' has been deleted", software.get().getName() );
            return ResponseEntity.ok().build();
        } else {
            LOG.warn( "Software id={} not found!", id );
            return ResponseEntity.notFound()
                    .headers( HeaderUtil.createFailureAlert( "software-management", "notFound", "Software not found" ) )
                    .build();
        }
    }

    @Override
    public Page<SoftwareInfo> searchFor( Pageable pageable, String name, String devName, String licName ) {
        if ( name == null || name.equals( "" ) ) name = "%";
        else name += "%";

        if ( devName == null || devName.equals( "" ) ) devName = "%";
        else devName += "%";

        if ( licName == null || licName.equals( "" ) ) licName = "%";
        else licName += "%";

        return repository.findByNameAndDeveloperNameAndLicenseName( pageable, name, devName, licName );
    }
}





