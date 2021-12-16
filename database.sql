CREATE TABLE users(
   id SERIAL PRIMARY KEY,
   name CHARACTER VARYING(20),
   login CHARACTER VARYING(20)
);
CREATE TABLE posts(
   id SERIAL PRIMARY KEY,
   title CHARACTER VARYING(255),
   content CHARACTER VARYING(255),
   userId INTEGER,
   FOREIGN KEY (userId) REFERENCES users(id)
);