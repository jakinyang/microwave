-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS menu_items CASCADE;
CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY NOT NULL,
  customer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(50) NOT NULL,
  name VARCHAR(50) NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  type VARCHAR(50) NOT NULL
);
