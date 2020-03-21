create table Person(
	name varchar(50),
	id int primary key,
	score integer,
	password varchar(100)
);
create table Challenges(
	title varchar(100),
	challenge_id int primary key,
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
	foreign key(challenge_id) references Challenges(challenge_id),
	status text,
	submit varchar(50)
);
create table Verification{
	id int,
	challenge_id int,
	verificator_id int,
	primary key (id, challeng_id, verificator_id),
	foreign key(id) references Person(id),
	foreign key(challenge_id) references Challenges(challenge_id),
	foreign key(verificator_id) references Challenges(verificator_id),
	status text
);