package org.kep.kursach.software.service;

import org.kep.kursach.software.domain.SoftwareInfo;
import org.springframework.http.ResponseEntity;

import java.util.List;

/**
 * Created by NicholasG on 05.03.2016.
 */
public interface SoftwareService {

    ResponseEntity<SoftwareInfo> add(SoftwareInfo software);

    ResponseEntity<SoftwareInfo> edit(SoftwareInfo software);

    ResponseEntity<Void> delete(Long id);

    List<SoftwareInfo> searchFor(String name, String release, String devName, String licName);
}
