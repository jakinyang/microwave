-- Drop and recreate restaurant_owners table (Example)

DROP TABLE IF EXISTS restaurant_owners CASCADE;
CREATE TABLE restaurant_owners (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(50) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  address VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL
);
