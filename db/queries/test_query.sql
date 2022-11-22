SELECT id, name, address
FROM customers;

SELECT id ,name, email
FROM restaurant_owners;

SELECT * FROM categories;

SELECT id, restaurant_owner_id, name, price, stock
FROM menu_items;

SELECT mi.name
FROM menu_items AS mi
JOIN menu_item_baskets AS mib
ON mib.menu_item_id = mi.id
JOIN baskets
ON baskets.id = mib.basket_id
JOIN customers
ON customers.id = baskets.customer_id
WHERE customers.id = 4;
