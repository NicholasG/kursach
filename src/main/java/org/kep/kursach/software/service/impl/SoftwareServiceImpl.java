package org.kep.kursach.software.service.impl;

import org.kep.kursach.software.domain.SoftwareInfo;
import org.kep.kursach.software.reporitory.SoftwareRepository;
import org.kep.kursach.software.service.SoftwareService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

/**
 * Created by NicholasG on 05.03.2016.
 */
@Component("softwareService")
public class SoftwareServiceImpl implements SoftwareService {

    private static final Logger LOG = LoggerFactory.getLogger(SoftwareServiceImpl.class);

    @Autowired
    private SoftwareRepository repository;

    @Override
    public ResponseEntity<?> addNewSoftware(SoftwareInfo software) {
        repository.save(software);
        LOG.info("Software '{}' has been added", software.getName());
        return ResponseEntity.ok().build();
    }

}
