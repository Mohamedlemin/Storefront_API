/* Replace with your SQL commands */
CREATE TABLE Orders (
    order_id SERIAL PRIMARY  KEY,
    quantity integer,
    fk_user_id bigint REFERENCES users(id),
    fk_product_id bigint REFERENCES Product(id),
    status VARCHAR(15)
);
