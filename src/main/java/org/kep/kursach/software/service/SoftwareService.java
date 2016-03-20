package org.kep.kursach.software.service;

import org.kep.kursach.software.domain.SoftwareInfo;
import org.springframework.http.ResponseEntity;

/**
 * Created by NicholasG on 05.03.2016.
 */
public interface SoftwareService {

    ResponseEntity<Void> addNewSoftware(SoftwareInfo software);

    ResponseEntity<SoftwareInfo> editSoftware(SoftwareInfo software);

    ResponseEntity<?> delete(Long id);
}
