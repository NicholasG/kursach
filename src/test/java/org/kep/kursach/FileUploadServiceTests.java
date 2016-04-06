package org.kep.kursach;

import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.testng.annotations.Test;

/**
 * Created by NicholasG on 02.04.2016.
 */
@SpringApplicationConfiguration( classes = Application.class )
@WebAppConfiguration
public class FileUploadServiceTests {

    private static final String filename = "test.jpg";

    @Test
    public void setLogoForDeveloperTest() throws Exception {
        MultiValueMap<String, Object> parts = new LinkedMultiValueMap<>();
        parts.add( "id", 1L );
        parts.add( "file", new FileSystemResource( filename ) );

        String url = "http://localhost:8080/dev/logo";

        long requestLength = new FileSystemResource( filename ).getFile().length();
        System.out.println( "Request length = " + requestLength );

        postImageTo( parts, url );
    }

    @Test
    public void setImageForSoftwareTest() {
        MultiValueMap<String, Object> parts = new LinkedMultiValueMap<>();
        parts.add( "id", 1L );
        parts.add( "file", new FileSystemResource( filename ) );

        String url = "http://localhost:8080/soft/images";

        long requestLength = new FileSystemResource( filename ).getFile().length();
        System.out.println( "Request length = " + requestLength );

        postImageTo( parts, url );
    }

    private void postImageTo( MultiValueMap<String, Object> parts, String url ) {
        HttpHeaders requestHeaders = new HttpHeaders();
        requestHeaders.setContentType( MediaType.MULTIPART_FORM_DATA );
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>( parts, requestHeaders );

        ResponseEntity<String> responseEntity = new RestTemplate().exchange( url, HttpMethod.POST, requestEntity, String.class );

        System.out.println( "\n\nResponse headers: " + responseEntity.getHeaders() );
    }

}
