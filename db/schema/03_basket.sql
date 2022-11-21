-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS baskets CASCADE;
CREATE TABLE baskets (
  id SERIAL PRIMARY KEY NOT NULL,
  customer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  order_status BOOLEAN DEFAULT false,
  time_received TIMESTAMP DEFAULT NULL,
  time_processing TIMESTAMP DEFAULT NULL,
  time_ready TIMESTAMP DEFAULT NULL
);
