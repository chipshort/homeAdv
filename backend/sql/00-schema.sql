
create table Person(
	id serial not null primary key,
	name varchar(50) unique not null,
	score integer not null,
	password varchar(100) not null
);

create table Challenge(
	id serial primary key,
	title varchar(100) not null,
	topic varchar(50) not null,
	description text not null,
	picture text not null
);

create table ActiveChallenge (
	challenge_id int not null,
	person_id int not null primary key,
	activation_ts timestamp not null,
	completed boolean not null,
	foreign key(person_id) references Person(id),
	foreign key(challenge_id) references Challenge(id)
);

create table ChallengeCompletion (
	id serial not null primary key,
	challenge_id int not null,
	person_id int not null,
	image_uuid text not null,
	-- approvals int not null,
	-- rejections int not null,
	foreign key(challenge_id) references Challenge(id),
	foreign key(person_id) references Person(id)
);

-- create table Currently_Running(
-- 	id int,
-- 	challenge_id int,
-- 	primary key(id, challenge_id),
-- 	foreign key(id) references Person(id),
-- 	foreign key(challenge_id) references Challenge(challenge_id),
-- 	status text,
-- 	submit varchar(50)
-- );

create table Verification (
	completion_id int not null,
	verificator_id int not null,
	primary key (verificator_id, completion_id),
	foreign key(completion_id) references ChallengeCompletion(id) on delete cascade,
	foreign key(verificator_id) references Person(id),
	status int not null -- negative denied positive accepted
);