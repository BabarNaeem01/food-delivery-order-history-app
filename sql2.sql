CREATE DATABASE IF NOT EXISTS assignment3_app10;
USE assignment3_app10;

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_code VARCHAR(30) NOT NULL,
  order_date DATE NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  items_summary TEXT NOT NULL
);

INSERT INTO orders (order_code, order_date, total_price, items_summary) VALUES
('FD-1001', '2026-04-01', 22.50, '1 Zinger burger, 1 fries, 1 drink'),
('FD-1002', '2026-04-02', 18.00, '2 shawarmas, 1 juice'),
('FD-1003', '2026-04-03', 31.75, '1 pizza, 1 pasta, 2 soft drinks');
