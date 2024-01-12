-- Your SQL goes here
create table 'room'
(
    'id'          integer primary key autoincrement,
    'name'        text    not null,
    'description' text    not null,
    'price'       integer not null,
    'image'       text    not null
);

INSERT INTO 'room' ('name', 'description', 'price', 'image')
VALUES ('Room 1', 'Spacious with balcony, offering stunning mountain views.', 150,
        'https://cdn.pixabay.com/photo/2013/03/23/04/29/master-bedroom-96086_1280.jpg');

INSERT INTO 'room' ('name', 'description', 'price', 'image')
VALUES ('Room 2', 'Compact room ideal for short stays.', 50,
        'https://cdn.pixabay.com/photo/2014/08/08/22/14/cabin-413770_1280.jpg');

INSERT INTO 'room' ('name', 'description', 'price', 'image')
VALUES ('Room 3', 'Spacious and bright, surrounded by nature through many windows.', 125,
        'https://cdn.pixabay.com/photo/2017/04/12/18/59/log-home-2225414_1280.jpg');
