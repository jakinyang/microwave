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



SELECT mi.*, COUNT(mi.id) AS quantity
    FROM menu_item_baskets AS mib
    JOIN menu_items AS mi
    ON mi.id = mib.menu_item_id
    JOIN baskets AS b
    ON b.id = mib.basket_id
    JOIN customers AS c
    ON c.id = b.customer_id
    WHERE c.id = $1
    GROUP BY mi.id;


SELECT mi.id, mi.name, mi.price, mi.stock, cat.name
  FROM menu_items AS mi
  JOIN menu_items_categories AS mic
  ON mi.id = mic.menu_item_id
  JOIN categories AS cat
  ON cat.id = mic.categories_id
  WHERE restaurant_owner_id = $1;


INSERT INTO menu_items (
      restaurant_owner_id,
      name,
      image_url,
      description,
      price,
      stock)
    VALUES (1, 'Perogi', 'http://image.com', 'Perogies so gud', 3000, 25)
    RETURNING *;
    INSERT INTO menu_items_categories (menu_item_id, categories_id)
    SELECT (SELECT MAX(id) FROM menu_items) 1;
