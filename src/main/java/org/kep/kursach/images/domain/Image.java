package org.kep.kursach.images.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.kep.kursach.software.domain.SoftwareInfo;
import org.springframework.data.annotation.Transient;

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

    @JsonIgnore
    @Column( name = "image_as_string", length = 3000000 )
    private String imageAsString;

    @Transient
    private byte[] image;

    @JsonIgnore
    @ManyToOne
    @JoinColumn( name = "software_id", nullable = false )
    private SoftwareInfo software;

    public Image( String imageAsString ) {
        this.imageAsString = imageAsString;
    }

    public Image() {
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage( byte[] image ) {
        this.image = image;
    }

    public Long getId() {
        return id;
    }

    public void setId( Long id ) {
        this.id = id;
    }

    public String getImageAsString() {
        return imageAsString;
    }

    public void setImageAsString( String imageAsString ) {
        this.imageAsString = imageAsString;
    }

    public SoftwareInfo getSoftware() {
        return software;
    }

    public void setSoftware( SoftwareInfo software ) {
        this.software = software;
    }
}
