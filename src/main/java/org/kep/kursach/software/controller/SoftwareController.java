package org.kep.kursach.software.controller;

import org.kep.kursach.software.domain.SoftwareInfo;
import org.kep.kursach.software.reporitory.SoftwareRepository;
import org.kep.kursach.software.service.SoftwareService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by NicholasG on 05.03.2016.
 */
@RestController
@RequestMapping( "/soft" )
public class SoftwareController {

    private static final Logger LOG = LoggerFactory.getLogger( SoftwareController.class );

    @Autowired
    private SoftwareRepository softwareRepository;

    @Autowired
    @Qualifier( value = "softwareService" )
    private SoftwareService softwareService;

    @RequestMapping(
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Page<SoftwareInfo>> search( Pageable pageable,
                                                      String name,
                                                      String release,
                                                      String devName,
                                                      String licName ) {
        if ( release != null && !release.equals( "" ) ) {
            LOG.info( "Searching for some software by " +
                            "name='{}', release='{}', devName='{}', licName='{}'",
                    name, release, devName, licName );
            Page<SoftwareInfo> page = softwareService.searchFor( pageable, name, release, devName, licName );
            return ResponseEntity.ok( page );
        } else {
            LOG.info( "Searching for some software by " +
                            "name='{}', devName='{}', licName='{}'",
                    name, devName, licName );
            Page<SoftwareInfo> page = softwareService.searchFor( pageable, name, release, devName, licName );

            return ResponseEntity.ok( page );
        }
    }

    @RequestMapping(
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<SoftwareInfo> addSoftware( @RequestBody SoftwareInfo software ) {
        LOG.info( "Adding software '{}'", software.getName() );
        return softwareService.add( software );
    }

    @RequestMapping(
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<SoftwareInfo> editSoftware( @RequestBody SoftwareInfo software ) {
        LOG.info( "Editing software '{}'", software.getName() );
        return softwareService.edit( software );
    }

    @RequestMapping(
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Void> deleteSoftware( @RequestParam( "id" ) Long id ) {
        LOG.info( "Deleting software id={}", id );
        return softwareService.delete( id );
    }

    @RequestMapping(
            value = "/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> getOne( @PathVariable( "id" ) Long id ) {
        LOG.info( "Getting software by id={}", id );
        return softwareRepository
                .findOneById( id )
                .map( ResponseEntity::ok )
                .orElseGet( () -> new ResponseEntity( HttpStatus.NOT_FOUND ) );
    }

}
