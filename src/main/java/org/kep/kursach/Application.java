package org.kep.kursach;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;

/**
 * Created by NicholasG on 01.03.2016.
 */
@SpringBootApplication
@ComponentScan
public class Application extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure( SpringApplicationBuilder builder ) {
        return builder.sources( Application.class );
    }

    public static void main( String[] args ) {
        SpringApplication.run( Application.class, args );
    }

}
