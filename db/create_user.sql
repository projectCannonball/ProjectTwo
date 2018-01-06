create user 'cb_user'@'localhost' IDENTIFIED BY 'abc123';

GRANT UPDATE, DELETE, SELECT, INSERT ON cannonball_db.* to 'cb_user'@'localhost';