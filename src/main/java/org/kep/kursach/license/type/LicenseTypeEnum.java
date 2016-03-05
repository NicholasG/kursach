package org.kep.kursach.license.type;

/**
 * Created by NicholasG on 02.03.2016.
 */
public enum LicenseTypeEnum {

    FREE("Безкоштовна"),
    TRIAL("Умовно безкоштовна"),
    PAID("Платна");

    private final String type;

    LicenseTypeEnum(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return type;
    }
}
