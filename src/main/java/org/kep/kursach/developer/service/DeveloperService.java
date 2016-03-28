package org.kep.kursach.developer.service;

import org.kep.kursach.developer.domain.DeveloperInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

/**
 * Created by NicholasG on 05.03.2016.
 */
public interface DeveloperService {


    ResponseEntity<DeveloperInfo> add(DeveloperInfo developer);

    ResponseEntity<?> edit(DeveloperInfo developer);

    ResponseEntity<Void> delete(Long id);

    Page<DeveloperInfo> searchFor(Pageable pageable, String name);
}
