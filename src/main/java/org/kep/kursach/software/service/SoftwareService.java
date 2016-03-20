package org.kep.kursach.software.service;

import org.kep.kursach.software.domain.SoftwareInfo;
import org.springframework.http.ResponseEntity;

/**
 * Created by NicholasG on 05.03.2016.
 */
public interface SoftwareService {

    ResponseEntity<Void> add(SoftwareInfo software);

    ResponseEntity<SoftwareInfo> edit(SoftwareInfo software);

    ResponseEntity<Void> delete(Long id);
}
