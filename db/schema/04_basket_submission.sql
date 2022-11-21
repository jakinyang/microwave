-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS basket_submission CASCADE;
CREATE TABLE basket_submission (
  id SERIAL PRIMARY KEY NOT NULL,
  customer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE,
  basket_id INTEGER REFERENCES baskets(id) ON DELETE CASCADE
);
