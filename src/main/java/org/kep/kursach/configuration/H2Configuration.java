package org.kep.kursach.configuration;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.util.Properties;

/**
 * Created by NicholasG on 05.03.2016.
 */
@Profile( "dev" )
@Configuration
@PropertySource( "classpath:/dev.properties" )
@EnableTransactionManagement
public class H2Configuration implements ApplicationListener<ContextRefreshedEvent> {

    @Value( "${spring.jpa.database-platform}" )
    private String dbPlatform;

    @Value( "${spring.jpa.hibernate.ddl-auto}" )
    private String dbDDL;

    @Value( "${spring.jpa.show-sql}" )
    private String dbShowSql;

    @Value( "${db.password}" )
    private String dbPassword;

    @Value( "${db.url}" )
    private String dbUrl;

    @Value( "${db.username}" )
    private String dbUsername;

    @Override
    public void onApplicationEvent( ContextRefreshedEvent contextRefreshedEvent ) {
        new EmbeddedDatabaseBuilder()
                .setType( EmbeddedDatabaseType.H2 )
                .addScript( "db-init.sql" )
                .build();

        ComboPooledDataSource cpds = new ComboPooledDataSource();
        cpds.setJdbcUrl( dbUrl );
        cpds.setUser( dbUsername );
        cpds.setPassword( dbPassword );
        cpds.setMaxPoolSize( 15 );
        cpds.setMaxIdleTime( 100 );
        cpds.setAcquireRetryAttempts( 1 );
        cpds.setNumHelperThreads( 3 );
    }

    @Bean
    public Properties hibernateProperties() {
        Properties hibernateProperties = new Properties();
        hibernateProperties.put( "spring.jpa.database-platform", dbPlatform );
        hibernateProperties.put( "spring.jpa.hibernate.ddl-auto", dbDDL );
        hibernateProperties.put( "spring.jpa.show-sql", dbShowSql );
        return hibernateProperties;
    }

}