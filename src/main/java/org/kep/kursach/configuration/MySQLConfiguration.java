package org.kep.kursach.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.hibernate4.HibernateTransactionManager;
import org.springframework.orm.hibernate4.LocalSessionFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.util.Properties;

/**
 * Created by NicholasG on 05.04.2016.
 */
@Profile( "prod" )
@Configuration
@PropertySource( "classpath:/prod.properties" )
@EnableTransactionManagement
public class MySQLConfiguration {

    @Value( "${db.driver}" )
    private String dbDriver;

    @Value( "${db.password}" )
    private String dbPassword;

    @Value( "${db.url}" )
    private String dbUrl;

    @Value( "${db.username}" )
    private String dbUsername;

    @Value( "${hibernate.dialect}" )
    private String dialect;

    @Value( "${hibernate.show_sql}" )
    private String dbShowSql;

    @Value( "${hibernate.hbm2ddl.auto}" )
    private String dbHbm2ddl;

    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();

        dataSource.setDriverClassName( dbDriver );
        dataSource.setUrl( dbUrl );
        dataSource.setUsername( dbUsername );
        dataSource.setPassword( dbPassword );
        return dataSource;
    }

    @Bean
    public LocalSessionFactoryBean sessionFactory() {
        LocalSessionFactoryBean sessionFactoryBean;

        sessionFactoryBean = new LocalSessionFactoryBean();
        sessionFactoryBean.setDataSource( dataSource() );
        sessionFactoryBean.setPackagesToScan( "org.kep.kursach" );
        Properties hibernateProperties = new Properties();
        hibernateProperties.put( "hibernate.dialect", dialect );
        hibernateProperties.put( "hibernate.show_sql", dbShowSql );
        hibernateProperties.put( "hibernate.hbm2ddl.auto", dbHbm2ddl );
        sessionFactoryBean.setHibernateProperties( hibernateProperties );
        return sessionFactoryBean;
    }

    @Bean
    public HibernateTransactionManager transactionManager() {
        HibernateTransactionManager transactionManager = new HibernateTransactionManager();
        transactionManager.setSessionFactory( sessionFactory().getObject() );
        return transactionManager;
    }

}
