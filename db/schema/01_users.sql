-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(50) NOT NULL,
  restaurant BOOLEAN DEFAULT false NOT NULL,
  phone VARCHAR(50) NOT NULL,
  restaurant_id INTEGER REFERENCES restaurant(id);
);
