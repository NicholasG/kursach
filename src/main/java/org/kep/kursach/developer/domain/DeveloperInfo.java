package org.kep.kursach.developer.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.kep.kursach.software.domain.SoftwareInfo;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import static javax.persistence.CascadeType.ALL;

/**
 * Created by NicholasG on 02.03.2016.
 */
@Entity
@Table( name = "developer_info" )
public class DeveloperInfo implements Serializable {

    @Id
    @GeneratedValue
    @Column( name = "id" )
    private Long id;

    @Column( name = "name", length = 200 )
    private String name;

    @Column( name = "country", length = 50 )
    private String country;

    @Column( name = "city", length = 50 )
    private String city;

    @Column( name = "street", length = 50 )
    private String street;

    @Column( name = "zipcode", length = 50 )
    private String zipcode;

    @Column( name = "email", length = 200 )
    private String email;

    @Column( name = "website", length = 200 )
    private String website;

    @Column( name = "phone_number", length = 20 )
    private String phoneNumber;

    @Column( name = "fax", length = 20 )
    private String fax;

    @JsonIgnore
    @OneToMany( targetEntity = SoftwareInfo.class, cascade = ALL, mappedBy = "developer" )
    private Set<SoftwareInfo> products = new HashSet<>();

    @Column( name = "logo", length = 3000000 )
    private String logo;

    public DeveloperInfo() {
    }

    public DeveloperInfo( String name,
                          String country,
                          String city,
                          String street,
                          String zipcode,
                          String email,
                          String website,
                          String phoneNumber,
                          String fax
    ) {
        this.name = name;
        this.country = country;
        this.city = city;
        this.street = street;
        this.zipcode = zipcode;
        this.email = email;
        this.website = website;
        this.phoneNumber = phoneNumber;
        this.fax = fax;
    }

    public Set<SoftwareInfo> getProducts() {
        return products;
    }

    public void setProducts( Set<SoftwareInfo> products ) {
        this.products = products;
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

    public String getCountry() {
        return country;
    }

    public void setCountry( String country ) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity( String city ) {
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet( String street ) {
        this.street = street;
    }

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode( String zipcode ) {
        this.zipcode = zipcode;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail( String email ) {
        this.email = email;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite( String website ) {
        this.website = website;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber( String phoneNumber ) {
        this.phoneNumber = phoneNumber;
    }

    public String getFax() {
        return fax;
    }

    public void setFax( String fax ) {
        this.fax = fax;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo( String logo ) {
        this.logo = logo;
    }

}
