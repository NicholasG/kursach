package org.kep.kursach.developer.service.impl;

import org.kep.kursach.developer.domain.DeveloperInfo;
import org.kep.kursach.developer.repository.DeveloperRepository;
import org.kep.kursach.developer.service.DeveloperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

/**
 * Created by NicholasG on 05.03.2016.
 */
@Component("developerService")
public class DeveloperServiceImpl implements DeveloperService {

    @Autowired
    private DeveloperRepository developerRepository;

}
