package org.kep.kursach.software.service.impl;

import org.kep.kursach.images.domain.Image;
import org.kep.kursach.images.repository.ImageRepository;
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
import org.springframework.util.Base64Utils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

/**
 * Created by NicholasG on 05.03.2016.
 */
@Component( "softwareService" )
public class SoftwareServiceImpl implements SoftwareService {

    private static final Logger LOG = LoggerFactory.getLogger( SoftwareServiceImpl.class );

    @Autowired
    private SoftwareRepository repository;

    @Autowired
    private ImageRepository imageRepository;

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
                    LOG.info( "Software '{}' has been edited", s.getName() );
                    return ResponseEntity.ok().body( s );
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
    public Page<SoftwareInfo> searchFor( Pageable pageable,
                                         String name,
                                         String release,
                                         String devName,
                                         String licName ) {
        if ( name == null || name.equals( "" ) ) name = "%";
        else name += "%";

        if ( devName == null || devName.equals( "" ) ) devName = "%";
        else devName += "%";

        if ( licName == null || licName.equals( "" ) ) licName = "%";
        else licName += "%";

        if ( release != null && !release.equals( "" ) )
            return repository.findAllByNameAndReleaseAndDeveloperNameAndLicenseName(
                    pageable,
                    name,
                    Date.valueOf( release ),
                    devName,
                    licName );
        else
            return repository.findAllByNameAndDeveloperNameAndLicenseName(
                    pageable,
                    name,
                    devName,
                    licName );
    }

    @Override
    public ResponseEntity<Void> addImage( Long id, MultipartFile image ) {
        return repository.findOneById( id )
                .map( s -> {
                    Image img = null;
                    try {
                        img = encodeImage( image );
                        img.setSoftware( s );
                    } catch ( IOException e ) {
                        e.printStackTrace();
                    }

                    Set<Image> images = s.getImages();
                    images.add( img );
                    s.setImages( images );
                    repository.saveAndFlush( s );
                    return ResponseEntity.ok().build();
                } )
                .orElseGet( () -> new ResponseEntity<>( HttpStatus.INTERNAL_SERVER_ERROR ) );
    }

    @Override
    public ResponseEntity<Set<Image>> getAllImages( Long id ) {
        Set<Image> images = repository.findOneById( id )
                .map( SoftwareInfo::getImages )
                .orElseGet( null );
        Set<Image> decodedImages = decodeImages( images );

        return ResponseEntity.ok( decodedImages );
    }

    @Override
    public ResponseEntity<Void> removeImage( Long imageId ) {
        imageRepository.delete( imageId );
        return ResponseEntity.ok().build();
    }

    private Image encodeImage( MultipartFile image ) throws IOException {
        String imgAsString = Base64Utils.encodeToString( image.getBytes() );
        return new Image( imgAsString );
    }

    private Set<Image> decodeImages( Set<Image> images ) {
        Set<Image> decodedImages = new HashSet<>();
        for ( Image image : images ) {
            byte[] decodeFromString = Base64Utils.decodeFromString( image.getImageAsString() );
            Image i = new Image();
            i.setImage( decodeFromString );
            decodedImages.add( i );
        }
        return decodedImages;
    }

}





