package org.kep.kursach.license.service;

import org.kep.kursach.license.domain.LicenseInfo;
import org.springframework.http.ResponseEntity;

/**
 * Created by NicholasG on 05.03.2016.
 */
public interface LicenseService {

    ResponseEntity<?> add(LicenseInfo license);

    ResponseEntity<?> edit(LicenseInfo license);

    ResponseEntity<Void> delete(Long id);

}
