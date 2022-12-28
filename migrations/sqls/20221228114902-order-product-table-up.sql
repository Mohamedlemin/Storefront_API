/* Replace with your SQL commands */
 CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES Orders(order_id),
    fk_product_id bigint REFERENCES Product(id)
);


    
