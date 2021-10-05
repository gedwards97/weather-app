CREATE DATABASE weatherapp;

CREATE TABLE british_locations(
    id SERIAL PRIMARY KEY,
    location_name VARCHAR(255),
    latitude NUMERIC,
    longitude NUMERIC
);