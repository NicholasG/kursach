package org.kep.kursach.software.service.impl;

import org.kep.kursach.software.domain.SoftwareInfo;
import org.kep.kursach.software.reporitory.SoftwareRepository;
import org.kep.kursach.software.service.SoftwareService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.Optional;

/**
 * Created by NicholasG on 05.03.2016.
 */
@Component("softwareService")
public class SoftwareServiceImpl implements SoftwareService {

    private static final Logger LOG = LoggerFactory.getLogger(SoftwareServiceImpl.class);

    @Autowired
    private SoftwareRepository repository;

    @Override
    public ResponseEntity<Void> addNewSoftware(SoftwareInfo software) {
        repository.save(software);
        LOG.info("Software '{}' has been added", software.getName());
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<Void> editSoftware(SoftwareInfo software) {
        repository.findOneById(software.getId()).ifPresent(s -> {
            s = software;
            repository.save(s);
        });
        LOG.info("Software '{}' has been edited", software.getName());
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        Optional<SoftwareInfo> software = repository.findOneById(id);
        if (software.isPresent()) {
            repository.delete(id);
            LOG.info("Software '{}' has been deleted", software.get().getName());
            return ResponseEntity.ok().build();
        } else {
            LOG.warn("Software '{}' not found!", software.get().getName());
            return ResponseEntity.badRequest().build();
        }
    }

}
