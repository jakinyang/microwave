-- Drop and recreate baskets table (Example)

DROP TABLE IF EXISTS baskets CASCADE;
CREATE TABLE baskets (
  id SERIAL PRIMARY KEY NOT NULL,
  customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
  time_received TIMESTAMP DEFAULT NULL,
  time_processing TIMESTAMP DEFAULT NULL,
  time_ready TIMESTAMP DEFAULT NULL
);
