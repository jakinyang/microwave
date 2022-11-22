-- Drop and recreate menu_item_baskets table (Example)

DROP TABLE IF EXISTS menu_item_baskets CASCADE;
CREATE TABLE menu_item_baskets (
  id SERIAL PRIMARY KEY NOT NULL,
  menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE,
  basket_id INTEGER REFERENCES baskets(id) ON DELETE CASCADE
);
