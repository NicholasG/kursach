package org.kep.kursach.license.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.kep.kursach.software.domain.SoftwareInfo;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

import static javax.persistence.CascadeType.ALL;

/**
 * Created by NicholasG on 02.03.2016.
 */
@Entity
@Table( name = "licenseInfo" )
public class LicenseInfo {

    private enum Type {
        FREE( "Безкоштовна" ),
        TRIAL( "Умовно безкоштовна" ),
        PAID( "Платна" );

        private final String type;

        Type( String type ) {
            this.type = type;
        }

        @Override
        public String toString() {
            return type;
        }
    }

    @Id
    @GeneratedValue
    @Column( name = "id" )
    private Long id;

    @Column( name = "name", length = 250 )
    private String name;

    @Column( name = "type" )
    private Type type;

    @Column( name = "minimumUsers" )
    private int minimumUsers;

    @Column( name = "maximumUsers" )
    private int maximumUsers;

    @Column( name = "expiration" )
    private int expiration;

    @Column( name = "priceForOne" )
    private double priceForOne;

    @Column( name = "priceForTen" )
    private double priceForTen;

    @Column( name = "priceForHundred" )
    private double priceForHundred;

    @JsonIgnore
    @OneToMany( targetEntity = SoftwareInfo.class, cascade = ALL, mappedBy = "license" )
    private Set<SoftwareInfo> products = new HashSet<>();

    public LicenseInfo() {
    }

    public LicenseInfo(
            String name,
            Type type,
            int minimumUsers,
            int maximumUsers,
            int expiration,
            double priceForOne,
            double priceForTen,
            double priceForHundred
    ) {
        this.name = name;
        this.type = type;
        this.minimumUsers = minimumUsers;
        this.maximumUsers = maximumUsers;
        this.expiration = expiration;
        this.priceForOne = priceForOne;
        this.priceForTen = priceForTen;
        this.priceForHundred = priceForHundred;
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

    public void setId( long id ) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName( String name ) {
        this.name = name;
    }

    public Type getType() {
        return type;
    }

    public void setType( Type type ) {
        this.type = type;
    }

    public int getMinimumUsers() {
        return minimumUsers;
    }

    public void setMinimumUsers( int minimumUsers ) {
        this.minimumUsers = minimumUsers;
    }

    public int getMaximumUsers() {
        return maximumUsers;
    }

    public void setMaximumUsers( int maximumUsers ) {
        this.maximumUsers = maximumUsers;
    }

    public int getExpiration() {
        return expiration;
    }

    public void setExpiration( int expiration ) {
        this.expiration = expiration;
    }

    public double getPriceForOne() {
        return priceForOne;
    }

    public void setPriceForOne( double priceForOne ) {
        this.priceForOne = priceForOne;
    }

    public double getPriceForTen() {
        return priceForTen;
    }

    public void setPriceForTen( double priceForTen ) {
        this.priceForTen = priceForTen;
    }

    public double getPriceForHundred() {
        return priceForHundred;
    }

    public void setPriceForHundred( double priceForHundred ) {
        this.priceForHundred = priceForHundred;
    }

}
