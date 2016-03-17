INSERT INTO developer_info(name, country, city, street, zipcode, phone_number, website, email, fax)
  VALUES('name', 'c', 'city', 'st', 'zip', '380665329987', 'website', 'email', 'fax');
-- INSERT INTO developer_info(name, country, city, street, zipcode, phone_number, website, email, fax)
--   VALUES();
-- INSERT INTO developer_info(name, country, city, street, zipcode, phone_number, website, email, fax)
--   VALUES();
-- INSERT INTO developer_info(name, country, city, street, zipcode, phone_number, website, email, fax)
--   VALUES();
-- INSERT INTO developer_info(name, country, city, street, zipcode, phone_number, website, email, fax)
--   VALUES();

INSERT INTO license_info(name, minimum_users, maximum_users, expiration, price_for_one, price_for_ten, price_for_hundred, type)
  VALUES('namee', 1, 100, 255, 25.50, 30.25, 40.75, 2);
-- INSERT INTO license_info(name, minimum_users, maximum_users, expiration, price_for_one, price_for_ten, price_for_hundred, type)
--   VALUES();
-- INSERT INTO license_info(name, minimum_users, maximum_users, expiration, price_for_one, price_for_ten, price_for_hundred, type)
--   VALUES();

INSERT INTO software_info(name, version, release, windows, macos, linux, developer_id, license_id)
  VALUES('nam', '14.01', '2015-04-04', TRUE, FALSE, FALSE, 1, 1);
INSERT INTO software_info(name, version, release, windows, macos, linux, developer_id, license_id)
  VALUES('nam2', '16.02', '2016-03-02', TRUE, TRUE, TRUE, 1, 1);
-- INSERT INTO software_info(name, version, release, windows, macos, linux, developer_id, license_id)
--   VALUES();
-- INSERT INTO software_info(name, version, release, windows, macos, linux, developer_id, license_id)
--   VALUES();
-- INSERT INTO software_info(name, version, release, windows, macos, linux, developer_id, license_id)
--   VALUES();

-- developer_info (city varchar(50), country varchar(50), email varchar(200), fax varchar(20), name varchar(200), phone_number varchar(20), street varchar(50), website varchar(200), zipcode varchar(50)
-- license_info (expiration integer, maximum_users integer, minimum_users integer, name varchar(250), price_for_hundred double, price_for_one double, price_for_ten double, type integer)
-- software_info (linux boolean, macos boolean, name varchar(250), release date, version varchar(255), windows boolean, developer_id bigint, license_id bigint)
