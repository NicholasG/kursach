package org.kep.kursach.images.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.kep.kursach.software.domain.SoftwareInfo;

import javax.persistence.*;

/**
 * Created by NicholasG on 05.04.2016.
 */
@Entity
@Table( name = "images" )
public class Image {

    @Id
    @GeneratedValue
    @Column( name = "id" )
    private Long id;

    @Column( name = "image", length = 3000000 )
    private String image;

    @JsonIgnore
    @ManyToOne
    @JoinColumn( name = "softwareId", nullable = false )
    private SoftwareInfo software;

    public Image( String image ) {
        this.image = image;
    }

    public Image() {
    }

    public Long getId() {
        return id;
    }

    public void setId( Long id ) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage( String image ) {
        this.image = image;
    }

    public SoftwareInfo getSoftware() {
        return software;
    }

    public void setSoftware( SoftwareInfo software ) {
        this.software = software;
    }
}
