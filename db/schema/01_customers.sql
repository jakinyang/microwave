-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS customers CASCADE;
CREATE TABLE customers (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(50) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  address VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL
);
