create table users(
	id serial not null primary key,
	first_name text not null,
    last_name text,
    username varchar,
    password varchar
);