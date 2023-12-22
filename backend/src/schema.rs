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
    booking_extras (id) {
        id -> Nullable<Integer>,
        booking_id -> Integer,
        user_id -> Integer,
        stripe_token_id -> Text,
        payment_amount -> Integer,
        has_bedsheets -> Nullable<Bool>,
        has_towels -> Nullable<Bool>,
        has_cleaning -> Nullable<Bool>,
        has_breakfast -> Nullable<Bool>,
        has_lunch -> Nullable<Bool>,
        has_dinner -> Nullable<Bool>,
        has_parking -> Nullable<Bool>,
        has_wifi -> Nullable<Bool>,
        has_safe -> Nullable<Bool>,
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
diesel::joinable!(booking_extras -> booking (booking_id));
diesel::joinable!(booking_extras -> user (user_id));

diesel::allow_tables_to_appear_in_same_query!(
    booking,
    booking_extras,
    room,
    user,
);
