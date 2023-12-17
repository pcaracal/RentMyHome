-- Your SQL goes here
create table 'room'
(
    'id'          integer primary key autoincrement,
    'name'        text    not null,
    'description' text    not null,
    'price'       integer not null,
    'image'       text    not null
);

insert into 'room' ('name', 'description', 'price', 'image')
values ('Room 1', 'Room 1 description', 100, 'https://http.cat/100.jpg');

insert into 'room' ('name', 'description', 'price', 'image')
values ('Room 2', 'Room 2 description', 200, 'https://http.cat/101.jpg');

insert into 'room' ('name', 'description', 'price', 'image')
values ('Room 3', 'Room 3 description', 300, 'https://http.cat/102.jpg');

insert into 'room' ('name', 'description', 'price', 'image')
values ('Room 4', 'Room 4 description', 400, 'https://http.cat/200.jpg');

insert into 'room' ('name', 'description', 'price', 'image')
values ('Room 5', 'Room 5 description', 500, 'https://http.cat/201.jpg');