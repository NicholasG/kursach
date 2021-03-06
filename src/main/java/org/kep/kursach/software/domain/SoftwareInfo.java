package org.kep.kursach.software.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.kep.kursach.developer.domain.DeveloperInfo;
import org.kep.kursach.images.domain.Image;
import org.kep.kursach.license.domain.LicenseInfo;

import javax.persistence.*;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

import static javax.persistence.CascadeType.ALL;

/**
 * Created by NicholasG on 02.03.2016.
 */
@Entity
@Table( name = "software_info" )
public class SoftwareInfo {

    @Id
    @GeneratedValue
    @Column( name = "id" )
    private Long id;

    @Column( name = "name", length = 250 )
    private String name;

    @Column( name = "version" )
    private String version;

    @Column( name = "_release" )
    private Date release;

    @ManyToOne
    @JoinColumn( name = "developer_id", nullable = false )
    private DeveloperInfo developer;

    @ManyToOne
    @JoinColumn( name = "license_id", nullable = false )
    private LicenseInfo license;

    @Column( name = "windows" )
    private boolean windows;

    @Column( name = "linux" )
    private boolean linux;

    @Column( name = "macOS" )
    private boolean macOS;

    @JsonIgnore
    @OneToMany( targetEntity = Image.class, cascade = ALL, mappedBy = "software" )
    private Set<Image> images = new HashSet<>();

    public SoftwareInfo() {
    }

    public SoftwareInfo( String name,
                         String version,
                         Date release,
                         DeveloperInfo developer,
                         LicenseInfo license,
                         boolean windows,
                         boolean linux,
                         boolean macOS
    ) {
        this.name = name;
        this.version = version;
        this.release = release;
        this.developer = developer;
        this.license = license;
        this.windows = windows;
        this.linux = linux;
        this.macOS = macOS;
    }

    public Long getId() {
        return id;
    }

    public void setId( Long id ) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName( String name ) {
        this.name = name;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion( String version ) {
        this.version = version;
    }

    public Date getRelease() {
        return release;
    }

    public void setRelease( Date release ) {
        this.release = release;
    }

    public DeveloperInfo getDeveloper() {
        return developer;
    }

    public void setDeveloper( DeveloperInfo developer ) {
        this.developer = developer;
    }

    public LicenseInfo getLicense() {
        return license;
    }

    public void setLicense( LicenseInfo license ) {
        this.license = license;
    }

    public boolean isWindows() {
        return windows;
    }

    public void setWindows( boolean windows ) {
        this.windows = windows;
    }

    public boolean isLinux() {
        return linux;
    }

    public void setLinux( boolean linux ) {
        this.linux = linux;
    }

    public boolean isMacOS() {
        return macOS;
    }

    public void setMacOS( boolean macOS ) {
        this.macOS = macOS;
    }

    public Set<Image> getImages() {
        return images;
    }

    public void setImages( Set<Image> images ) {
        this.images = images;
    }
}
