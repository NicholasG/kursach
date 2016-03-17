package org.kep.kursach.software.domain;

import org.hibernate.annotations.JoinColumnOrFormula;
import org.kep.kursach.developer.domain.DeveloperInfo;
import org.kep.kursach.license.domain.LicenseInfo;

import javax.persistence.*;
import java.sql.Date;

/**
 * Created by NicholasG on 02.03.2016.
 */
@Entity
@Table(name = "softwareInfo")
public class SoftwareInfo {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "name", length = 250)
    private String name;

    @Column(name = "version")
    private String version;

    @Column(name = "release")
    private Date release;

    @ManyToOne
    @JoinColumn(name = "developerId", nullable = false)
    private DeveloperInfo developer;

    @ManyToOne
    @JoinColumn(name = "licenseId", nullable = false)
    private LicenseInfo license;

    @Column(name = "windows")
    private boolean windows;

    @Column(name = "linux")
    private boolean linux;

    @Column(name = "macOS")
    private boolean macOS;

    public SoftwareInfo() {
    }

    public SoftwareInfo(
            String name,
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

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public Date getRelease() {
        return release;
    }

    public void setRelease(Date release) {
        this.release = release;
    }

    public DeveloperInfo getDeveloper() {
        return developer;
    }

    public void setDeveloper(DeveloperInfo developer) {
        this.developer = developer;
    }

    public LicenseInfo getLicense() {
        return license;
    }

    public void setLicense(LicenseInfo license) {
        this.license = license;
    }

    public boolean isWindows() {
        return windows;
    }

    public void setWindows(boolean windows) {
        this.windows = windows;
    }

    public boolean isLinux() {
        return linux;
    }

    public void setLinux(boolean linux) {
        this.linux = linux;
    }

    public boolean isMacOS() {
        return macOS;
    }

    public void setMacOS(boolean macOS) {
        this.macOS = macOS;
    }
}
