package org.kep.kursach.developer.service.impl;

import org.kep.kursach.developer.domain.DeveloperInfo;
import org.kep.kursach.developer.repository.DeveloperRepository;
import org.kep.kursach.developer.service.DeveloperService;
import org.kep.kursach.web.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

/**
 * Created by NicholasG on 05.03.2016.
 */
@Component( "developerService" )
public class DeveloperServiceImpl implements DeveloperService {

    private static final Logger LOG = LoggerFactory.getLogger( DeveloperServiceImpl.class );

    @Autowired
    private DeveloperRepository repository;

    @Override
    public ResponseEntity<DeveloperInfo> add( DeveloperInfo developer ) {
        repository.saveAndFlush( developer );
        LOG.info( "Developer '{}' has been added", developer.getName() );
        return ResponseEntity.ok( developer );
    }

    @Override
    public ResponseEntity<?> edit( DeveloperInfo developer ) {
        return repository
                .findOneById( developer.getId() )
                .map( d -> {
                    d.setName( developer.getName() );
                    d.setCountry( developer.getCountry() );
                    d.setCity( developer.getCity() );
                    d.setStreet( developer.getStreet() );
                    d.setEmail( developer.getEmail() );
                    d.setWebsite( developer.getWebsite() );
                    d.setPhoneNumber( developer.getPhoneNumber() );
                    d.setZipcode( developer.getZipcode() );
                    d.setFax( developer.getFax() );
                    repository.saveAndFlush( d );
                    LOG.info( "Developer '{}' has been edited", d.getName() );
                    return ResponseEntity.ok().body( d );
                } )
                .orElseGet( () -> new ResponseEntity( HttpStatus.INTERNAL_SERVER_ERROR ) );
    }

    @Override
    public ResponseEntity<Void> delete( Long id ) {
        return repository.findOneById( id )
                .map( d -> {
                    if ( d.getProducts().isEmpty() ) {
                        repository.delete( d );
                        LOG.info( "Developer '{}' has been deleted", d.getName() );
                        return ResponseEntity.ok().build();
                    } else {
                        LOG.warn( "Developer '{}' could not be deleted because is in use yet", d.getName() );
                        return ResponseEntity.badRequest()
                                .headers( HeaderUtil.createFailureAlert( "developer-management", "inuse", "Developer in use" ) )
                                .build();
                    }

                } )
                .orElseGet( () -> new ResponseEntity( HttpStatus.NOT_FOUND ) );
    }

    @Override
    public Page<DeveloperInfo> searchFor( Pageable pageable, String name, String country ) {
        if ( name == null || name.equals( "" ) ) name = "%";
        else name += "%";
        if ( country == null || !country.equals( "" ) ) country = "%";
        else country += "%";

        return repository.findOneByNameAndCountry( pageable, name, country );
    }

}
