package org.kep.kursach.developer.controller;

import org.kep.kursach.developer.domain.DeveloperInfo;
import org.kep.kursach.developer.repository.DeveloperRepository;
import org.kep.kursach.developer.service.DeveloperService;
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
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by NicholasG on 05.03.2016.
 */
@RestController
@RequestMapping( "/dev" )
public class DeveloperController {

    private static final Logger LOG = LoggerFactory.getLogger( DeveloperController.class );

    @Autowired
    private DeveloperRepository developerRepository;

    @Autowired
    @Qualifier( value = "developerService" )
    private DeveloperService developerService;

    @RequestMapping(
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Page<DeveloperInfo>> search( Pageable pageable, String name, String country ) {
        LOG.info( "Searching for developer by name='{}', country='{}'", name, country );
        Page<DeveloperInfo> page = developerService.searchFor( pageable, name, country );

        return ResponseEntity.ok( page );
    }

    @RequestMapping(
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<DeveloperInfo> addDeveloper( @RequestBody DeveloperInfo developer ) {
        LOG.info( "Adding developer '{}'", developer.getName() );
        return developerService.add( developer );
    }

    @RequestMapping(
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> editDeveloper( @RequestBody DeveloperInfo developer ) {
        LOG.info( "Editing developer '{}'", developer.getName() );
        return developerService.edit( developer );
    }

    @RequestMapping(
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Void> deleteDeveloper( @RequestParam( "id" ) Long id ) {
        LOG.info( "Deleting developer id={}", id );
        return developerService.delete( id );
    }

    @RequestMapping(
            value = "/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<DeveloperInfo> getOne( @PathVariable( "id" ) Long id ) {
        LOG.info( "Getting developer by id={}", id );
        return developerRepository
                .findOneById( id )
                .map( ResponseEntity::ok )
                .orElseGet( () -> new ResponseEntity( HttpStatus.NOT_FOUND ) );
    }

    @RequestMapping(
            value = "/logo",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<String> getLogo( @RequestParam( "id" ) Long id ) {
        LOG.info( "Getting a logo for dev id='{}'", id );

        return developerService.getLogo( id );
    }

    @RequestMapping(
            value = "/logo",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Void> updateLogo( @RequestParam( "id" ) Long id,
                                            @RequestParam( "file" ) MultipartFile image ) {
        LOG.info( "Updating dev id='{}' image", id );

        return developerService.updateLogo( id, image );
    }

}
