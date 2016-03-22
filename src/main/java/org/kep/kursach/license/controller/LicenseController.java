package org.kep.kursach.license.controller;

import org.kep.kursach.license.domain.LicenseInfo;
import org.kep.kursach.license.reporitory.LicenseRepository;
import org.kep.kursach.license.service.LicenseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by NicholasG on 05.03.2016.
 */
@RestController
@RequestMapping("/license")
public class LicenseController {

    private static final Logger LOG = LoggerFactory.getLogger(LicenseController.class);

    @Autowired
    private LicenseRepository licenseRepository;

    @Autowired
    @Qualifier("licenseService")
    private LicenseService licenseService;

    @RequestMapping(
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<List<LicenseInfo>> getAll() {
        LOG.info("Getting all licenses");
        return ResponseEntity.ok(licenseRepository.findAll());
    }

    @RequestMapping(
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> addLicense(@RequestBody LicenseInfo license) {
        LOG.info("Adding license '{}'", license.getName());
        return licenseService.add(license);
    }

    @RequestMapping(
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> editLicense(@RequestBody LicenseInfo license) {
        LOG.info("Editing license '{}'", license.getName());
        return licenseService.edit(license);
    }

    @RequestMapping(
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Void> deleteLicense(@RequestParam("id") Long id) {
        LOG.info("Deleting license id={}", id);
        return licenseService.delete(id);
    }

}
