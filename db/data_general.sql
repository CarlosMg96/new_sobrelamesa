-- Insertar datos en la tabla `categories` con clasificación "A"
INSERT INTO db_sobrelamesa.categories (id, category, classification, status)
SELECT id, categoria, 'A' AS classification, status
FROM sobrelamesa_sobrelamesa.categoria_producto;

-- Insertar datos en la tabla `subcategories`
INSERT INTO db_sobrelamesa.subcategories (subcategory, category_id, status)
SELECT sub_categoria, 1, status
FROM sobrelamesa_sobrelamesa.sub_categorias;

delete from db_sobrelamesa.subcategories where status = 1;
SELECT * FROM db_sobrelamesa.subcategories;

-- Insertar datos en la tabla `products`
INSERT INTO db_sobrelamesa.products (product, product_key, dimensions, image, maintenance_days, status, subcategory_id)
SELECT producto, clave, medidas, imagen, dias_mantenimiento, status, 43
FROM sobrelamesa_sobrelamesa.producto;


select * from db_sobrelamesa.categories;

-- Obtener el último ID insertado en `products`
SET @last_product_id = LAST_INSERT_ID();

-- Insertar datos en la tabla `history_products`
INSERT INTO db_sobrelamesa.history_products (product_id, stock, rental_price, replacement_cost, cost_excluding_taxes, cost, security_deposit)
SELECT @last_product_id, stock, precio_renta, precio_reposicion, costo_sin_iva, costo, deposito_garantia
FROM sobrelamesa_sobrelamesa.producto;



SELECT p.subcategoria_id
FROM sobrelamesa_sobrelamesa.producto p
LEFT JOIN db_sobrelamesa.subcategories s ON p.subcategoria_id = s.id
WHERE s.id IS NULL; -- Esto mostrará cualquier valor en products.subcategory_id que no exista en subcategories.id
