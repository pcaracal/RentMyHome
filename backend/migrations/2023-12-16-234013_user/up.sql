-- Your SQL goes here
create table 'user'
(
    'id'       integer primary key autoincrement,
    'username'     text not null,
    'password' text not null
);


-- pw = 'password'
insert into 'user' ('username', 'password')
values ('admin',
        '$argon2id$v=19$m=19456,t=2,p=1$+/dL5q9tA6W+IZunlvuAZg$r1viC5wTLeCRZTq9VbNdLKzL7yGytCfp75b1jspCMYc');