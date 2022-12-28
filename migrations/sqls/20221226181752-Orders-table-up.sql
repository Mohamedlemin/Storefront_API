/* Replace with your SQL commands */
    CREATE TABLE Orders (
    order_id SERIAL PRIMARY KEY,
    status VARCHAR(15),
    fk_user_id bigint REFERENCES users(id)
);


