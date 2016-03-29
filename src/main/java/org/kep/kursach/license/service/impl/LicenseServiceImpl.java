package org.kep.kursach.license.service.impl;

import org.kep.kursach.license.domain.LicenseInfo;
import org.kep.kursach.license.reporitory.LicenseRepository;
import org.kep.kursach.license.service.LicenseService;
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
@Component( "licenseService" )
public class LicenseServiceImpl implements LicenseService {

    private static final Logger LOG = LoggerFactory.getLogger( LicenseServiceImpl.class );

    @Autowired
    private LicenseRepository repository;

    @Override
    public ResponseEntity<?> add( LicenseInfo license ) {
        if ( repository.findOneByName( license.getName() ).isPresent() ) {
            LOG.warn( "License '{}' already exists", license.getName() );
            return ResponseEntity.badRequest()
                    .headers( HeaderUtil.createFailureAlert( "license-management", "licenseexists", "License already exists" ) )
                    .build();
        } else {
            repository.saveAndFlush( license );
            LOG.info( "License '{}' has been saved", license.getName() );
            return ResponseEntity.ok( license );
        }
    }

    @Override
    public ResponseEntity<Void> delete( Long id ) {
        return repository.findOneById( id )
                .map( l -> {
                    if ( l.getProducts().isEmpty() ) {
                        repository.delete( l );
                        LOG.info( "License id={} has been deleted", id );
                        return ResponseEntity.ok().build();
                    } else {
                        LOG.warn( "License '{}' could not be deleted because is in use yet", l.getName() );
                        return ResponseEntity.badRequest()
                                .headers( HeaderUtil.createFailureAlert( "license-management", "inuse", "License in use" ) )
                                .build();
                    }
                } )
                .orElseGet( () -> new ResponseEntity( HttpStatus.NOT_FOUND ) );
    }

    @Override
    public ResponseEntity<?> edit( LicenseInfo license ) {
        Optional<LicenseInfo> existingLicense = repository.findOneByName( license.getName() );
        if ( existingLicense.isPresent() && !license.getId().equals( existingLicense.get().getId() ) ) {
            LOG.warn( "License name '{}' already in use", license.getName() );
            return ResponseEntity.badRequest()
                    .headers( HeaderUtil.createFailureAlert( "license-management", "licenseexists", "License name already in use" ) )
                    .build();
        } else {
            return repository.findOneById( license.getId() )
                    .map( l -> {
                        l.setName( license.getName() );
                        l.setType( license.getType() );
                        l.setExpiration( license.getExpiration() );
                        l.setMinimumUsers( license.getMinimumUsers() );
                        l.setMaximumUsers( license.getMaximumUsers() );
                        l.setPriceForOne( license.getPriceForOne() );
                        l.setPriceForTen( license.getPriceForTen() );
                        l.setPriceForHundred( license.getPriceForHundred() );
                        repository.saveAndFlush( l );
                        LOG.info( "License '{}' has been edited", l.getName() );
                        return ResponseEntity.ok().body( l );
                    } )
                    .orElseGet( () -> new ResponseEntity( HttpStatus.INTERNAL_SERVER_ERROR ) );
        }
    }

    @Override
    public Page<LicenseInfo> searchFor( Pageable pageable, String name, String type ) {
        if ( name == null || name.equals( "" ) ) name = "%";
        else name += "%";

        if ( type == null || type.equals( "" ) ) {
            return repository.findAllByName( pageable, name );
        } else {
            LicenseInfo.Type t = LicenseInfo.Type.valueOf( type.toUpperCase() );
            return repository.findAllByNameAndType( pageable, name, t );
        }
    }
}
