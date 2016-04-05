package org.kep.kursach.images.repository;

import org.kep.kursach.images.domain.Image;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by NicholasG on 05.04.2016.
 */
public interface ImageRepository extends JpaRepository<Image, Long> {
}
