package org.kep.kursach.software.service;

import org.kep.kursach.software.domain.SoftwareInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by NicholasG on 05.03.2016.
 */
public interface SoftwareService {

    ResponseEntity<SoftwareInfo> add( SoftwareInfo software );

    ResponseEntity<SoftwareInfo> edit( SoftwareInfo software );

    ResponseEntity<Void> delete( Long id );

    Page<SoftwareInfo> searchFor( Pageable pageable, String name, String release, String devName, String licName );

    ResponseEntity<Void> addImage( Long id, MultipartFile image );

    ResponseEntity<Void> removeImage( Long imageId );

}
