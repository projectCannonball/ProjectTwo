CREATE TABLE Users (
	ID INT auto_increment PRIMARY KEY,
	userName VARCHAR(255) NOT NULL,
	firstName VARCHAR(255) NOT NULL,
	lastName VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL COLLATE utf8_bin,
	height INT UNSIGNED,
	weight INT UNSIGNED,
	race VARCHAR(255),
	age INT UNSIGNED,
	sex VARCHAR(255),
	city VARCHAR(255),
	state VARCHAR(255),
    email VARCHAR(255),
	create_ts TIMESTAMP NOT NULL DEFAULT current_timestamp,
	update_ts TIMESTAMP NOT NULL DEFAULT current_timestamp ON UPDATE current_timestamp
);


CREATE TABLE Races (
	ID INT AUTO_INCREMENT PRIMARY KEY,
    raceName VARCHAR(255) NOT NULL,
    raceDesc VARCHAR(255) NOT NULL,
    distance DECIMAL(20, 5) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    startLoc VARCHAR(255) NOT NULL,
    endLoc VARCHAR(255) NOT NULL,
    type VARCHAR(255),
    creator_id INT NOT NULL,
    create_ts TIMESTAMP NOT NULL DEFAULT current_timestamp,
    update_ts TIMESTAMP NOT NULL DEFAULT current_timestamp ON UPDATE current_timestamp
);

CREATE TABLE user_race (
	user_id INT NOT NULL,
    race_id INT NOT NULL,
    status VARCHAR(15) NOT NULL,
    finishPlace INT,
    entryDate DATE NOT NULL,
    create_ts TIMESTAMP NOT NULL DEFAULT current_timestamp,
    update_ts TIMESTAMP NOT NULL DEFAULT current_timestamp ON UPDATE current_timestamp,
    PRIMARY KEY (user_id, race_id),
    foreign key ur_user_id_fk (user_id) references users(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    foreign key ur_race_id_fk (race_id) references races(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE userRace_history (
	ID INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    race_id INT NOT NULL,
    distance DECIMAL(20,4) NOT NULL,
    activityDt DATE NOT NULL,
    time BIGINT NOT NULL,
    create_ts TIMESTAMP NOT NULL DEFAULT current_timestamp,
    foreign key urh_user_id_fk (user_id) references users(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    foreign key urh_race_id_fk (race_id) references races(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    constraint entryUnique UNIQUE(user_id, race_id, activityDt)   
);