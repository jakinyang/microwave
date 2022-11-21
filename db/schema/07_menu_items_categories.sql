
DROP TABLE IF EXISTS menu_items_catagories CASCADE

CREATE TABLE menu_items_catagories (
  id SERIAL PRIMARY KEY NOT NULL,
  menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE,
  catagories_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
);
