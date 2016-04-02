package org.kep.kursach;

import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ResponseEntity;
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

    private static final String filename = "Snake_River_(5mb).jpg";

    @Test
    public void fileUploadTest() throws Exception {
        MultiValueMap<String, Object> parts = new LinkedMultiValueMap<>();
        parts.add( "id", 1L );
        parts.add( "file", new FileSystemResource( filename ) );

        RestTemplate restTemplate = new RestTemplate();
        String url = "http://localhost:8080/dev/upload";

        long requestLength = new FileSystemResource( filename ).getFile().length();
        System.out.println( "Request length = " + requestLength );

        ResponseEntity<String> stringResponseEntity = restTemplate.postForEntity( url, parts, String.class );

        System.out.println( "\n\nResponse headers: " + stringResponseEntity.getHeaders().toString() );
    }

}
