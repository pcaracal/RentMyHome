-- Your SQL goes here
create table 'user'
(
    'id'         integer  not null primary key autoincrement,
    'name'       text     not null,
    'email'      text     not null,
    'password'   text     not null,
    'created_at' datetime not null default current_timestamp
);


-- pw = 'password'
insert into 'user' ('name', 'email', 'password')
values ('admin', 'admin@admin.rs',
        '$argon2id$v=19$m=19456,t=2,p=1$+/dL5q9tA6W+IZunlvuAZg$r1viC5wTLeCRZTq9VbNdLKzL7yGytCfp75b1jspCMYc');