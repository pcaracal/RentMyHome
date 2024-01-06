-- Your SQL goes here
create table 'booking'
(
    'id'         integer primary key autoincrement,
    'start_date' text    not null,
    'end_date'   text    not null,
    'room_id'    integer not null,
    'user_id'    integer not null,
    foreign key ('room_id') references 'room' ('id') on delete cascade on update cascade,
    foreign key ('user_id') references 'user' ('id') on delete cascade on update cascade
);