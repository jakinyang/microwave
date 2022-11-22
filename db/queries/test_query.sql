SELECT menu.id, customer_id, menu.name, description, price, type
FROM menu_items menu
JOIN users
ON customer_id = users.id
WHERE users.id = 2;

SELECT users.name AS owner_name, menu.name, COUNT(menu.*) AS item_count
FROM menu_items menu
JOIN users
ON menu.customer_id = users.id
GROUP BY users.name, menu.customer_id, menu.name
ORDER BY users.name;
