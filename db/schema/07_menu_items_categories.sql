DROP TABLE IF EXISTS menu_items_categories CASCADE;

CREATE TABLE menu_items_categories (
  id SERIAL PRIMARY KEY NOT NULL,
  menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE,
  categories_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
);
