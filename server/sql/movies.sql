create table user_playlist (
	id serial not null primary key,
    movie_list varchar,
	users_id int,
	foreign key (users_id) references users(id)
);