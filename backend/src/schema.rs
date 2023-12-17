// @generated automatically by Diesel CLI.

diesel::table! {
    booking (id) {
        id -> Nullable<Integer>,
        start_date -> Text,
        end_date -> Text,
        room_id -> Integer,
        user_id -> Integer,
    }
}

diesel::table! {
    room (id) {
        id -> Nullable<Integer>,
        name -> Text,
        description -> Text,
        price -> Integer,
        image -> Text,
    }
}

diesel::table! {
    user (id) {
        id -> Nullable<Integer>,
        username -> Text,
        password -> Text,
    }
}

diesel::joinable!(booking -> room (room_id));
diesel::joinable!(booking -> user (user_id));

diesel::allow_tables_to_appear_in_same_query!(
    booking,
    room,
    user,
);
