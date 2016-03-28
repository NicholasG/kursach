package org.kep.kursach.web.util;

import org.springframework.http.HttpHeaders;

/**
 * Created by NicholasG on 17.03.2016.
 */
public class HeaderUtil {

    public static HttpHeaders createAlert( String message, String param ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add( "X-kursach-alert", message );
        headers.add( "X-kursach-params", param );
        return headers;
    }

    public static HttpHeaders createEntityCreationAlert( String entityName, String param ) {
        return createAlert( "kursach." + entityName + ".created", param );
    }

    public static HttpHeaders createEntityUpdateAlert( String entityName, String param ) {
        return createAlert( "kursach." + entityName + ".updated", param );
    }

    public static HttpHeaders createEntityDeletionAlert( String entityName, String param ) {
        return createAlert( "kursach." + entityName + ".deleted", param );
    }

    public static HttpHeaders createFailureAlert( String entityName, String errorKey, String defaultMessage ) {
        HttpHeaders headers = new HttpHeaders();
        headers.add( "X-kursach-error", "error." + errorKey );
        headers.add( "X-kursach-params", entityName );
        headers.add( "X-kursach-message", defaultMessage );
        return headers;
    }

}
