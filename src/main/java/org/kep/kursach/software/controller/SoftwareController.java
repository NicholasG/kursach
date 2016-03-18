package org.kep.kursach.software.controller;

import org.kep.kursach.software.domain.SoftwareInfo;
import org.kep.kursach.software.reporitory.SoftwareRepository;
import org.kep.kursach.software.service.SoftwareService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

/**
 * Created by NicholasG on 05.03.2016.
 */
@RestController
@RequestMapping("/soft")
public class SoftwareController {

    private static final Logger LOG = LoggerFactory.getLogger(SoftwareController.class);

    @Autowired
    private SoftwareRepository softwareRepository;

    @Autowired
    @Qualifier("softwareService")
    private SoftwareService softwareService;

    @RequestMapping(
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<List<SoftwareInfo>> getAll() {
        LOG.info("Getting all software");
        return ResponseEntity.ok(softwareRepository.findAll());
    }

    @RequestMapping(
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Void> addNewSoftware(@RequestBody SoftwareInfo software) {
        LOG.info("Adding software '{}'", software.getName());
        return softwareService.addNewSoftware(software);
    }

    @RequestMapping(
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Void> editSoftware(@RequestBody SoftwareInfo software) {
        LOG.info("Editing software '{}'", software.getName());
        return softwareService.editSoftware(software);
    }

    @RequestMapping(
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> deleteSoftware(@RequestParam("id") Long id) {
        LOG.info("Deleting software");
        return softwareService.delete(id);
    }

    @RequestMapping(
            value = "/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> getOne(@PathVariable("id") Long id) {
        Optional<SoftwareInfo> software = softwareRepository.findOneById(id);
        if (software.isPresent()) {
            return ResponseEntity.ok(software.get());
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @RequestMapping(
            value = "/byDev",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Object[] findByDeveloperName(String name) {
        Stream<SoftwareInfo> stream = softwareRepository.findByDeveloperName(name + '%');
        Object[] objects = stream.toArray();
        stream.close();
        return objects;
    }

}
