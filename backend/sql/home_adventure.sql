create table Person(
	name varchar(50),
	id int auto_increment primary key,
	score integer,
	password varchar(100)
);
create table Challenge(
	title varchar(100),
	challenge_id int auto_increment primary key,
	topic varchar(50),
	description text,
	picture text,
	begin time,
	end time
);
create table Currently_Running(
	id int,
	challenge_id int,
	primary key(id, challenge_id),
	foreign key(id) references Person(id),
	foreign key(challenge_id) references Challenge(challenge_id),
	status text,
	submit varchar(50)
);
create table Verification{
	id int,
	challenge_id int,
	verificator_id int,
	primary key (id, challenge_id, verificator_id),
	foreign key(id) references Person(id),
	foreign key(challenge_id) references Challenge(challenge_id),
	foreign key(verificator_id) references Person(id),
	status text
);