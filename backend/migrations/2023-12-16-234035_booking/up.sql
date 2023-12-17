-- Your SQL goes here
create table 'booking'
(
    'id'         integer primary key autoincrement,
    'start_date' text    not null,
    'end_date'   text    not null,
    'room_id'    integer not null,
    'user_id'    integer not null,
    'created_at' text    not null default current_timestamp,
    foreign key ('room_id') references 'room' ('id') on delete cascade on update cascade,
    foreign key ('user_id') references 'user' ('id') on delete cascade on update cascade
);

insert into 'booking' ('start_date', 'end_date', 'room_id', 'user_id')
values ('2023-12-01', '2023-12-02', 1, 1);

insert into 'booking' ('start_date', 'end_date', 'room_id', 'user_id')
values ('2023-12-04', '2023-12-18', 1, 1);

insert into 'booking' ('start_date', 'end_date', 'room_id', 'user_id')
values ('2023-12-27', '2024-01-09', 1, 1);

insert into 'booking' ('start_date', 'end_date', 'room_id', 'user_id')
values ('2024-01-14', '2024-01-15', 1, 1);

insert into 'booking' ('start_date', 'end_date', 'room_id', 'user_id')
values ('2024-01-20', '2024-01-25', 1, 1);

insert into 'booking' ('start_date', 'end_date', 'room_id', 'user_id')
values ('2023-12-01', '2023-12-02', 2, 1);

insert into 'booking' ('start_date', 'end_date', 'room_id', 'user_id')
values ('2023-12-04', '2023-12-10', 2, 1);

insert into 'booking' ('start_date', 'end_date', 'room_id', 'user_id')
values ('2023-12-23', '2023-12-25', 2, 1);

insert into 'booking' ('start_date', 'end_date', 'room_id', 'user_id')
values ('2023-12-01', '2023-12-02', 3, 1);

insert into 'booking' ('start_date', 'end_date', 'room_id', 'user_id')
values ('2023-12-04', '2023-12-10', 3, 1);

insert into 'booking' ('start_date', 'end_date', 'room_id', 'user_id')
values ('2023-12-01', '2023-12-02', 4, 1);

insert into 'booking' ('start_date', 'end_date', 'room_id', 'user_id')
values ('2023-12-04', '2023-12-10', 4, 1);

insert into 'booking' ('start_date', 'end_date', 'room_id', 'user_id')
values ('2023-12-01', '2023-12-02', 5, 1);

insert into 'booking' ('start_date', 'end_date', 'room_id', 'user_id')
values ('2023-12-04', '2023-12-10', 5, 1);