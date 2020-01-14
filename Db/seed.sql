Create table users (
  user_id serial primary key, 
  username varchar(50),
  email text,
  name text,
  password text,
  profile_pic text,
  bio varchar(250)
)