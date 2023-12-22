-- Your SQL goes here
create table 'booking_extras'
(
    id              integer primary key autoincrement,
    booking_id      integer not null,
    user_id         integer not null,
    stripe_token_id text    not null,
    payment_amount  integer not null,
    has_bedsheets   boolean default false,
    has_towels      boolean default false,
    has_cleaning    boolean default false,
    has_breakfast   boolean default false,
    has_lunch       boolean default false,
    has_dinner      boolean default false,
    has_parking     boolean default false,
    has_wifi        boolean default false,
    has_safe        boolean default false,
    foreign key (booking_id) references booking (id),
    foreign key (user_id) references user (id)
);