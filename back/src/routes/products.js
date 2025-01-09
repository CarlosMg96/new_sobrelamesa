const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products/productsController');
const categoriesController = require('../controllers/products/categoriesController');
const subcategoriesController = require('../controllers/products/subcategorysController');
const historyProductsController = require('../controllers/products/historyProductsController');
const verifyToken = require('../middleware/verifyToken');
const checkRole = require('../middleware/checkRole');

// Rutas Productos
router.get('/products/get_products', verifyToken, checkRole(['MASTER', 'ADMIN', 'SALES', 'WAREHOUSE']), productsController.getProducts);
router.post('/products/add_product', verifyToken, checkRole(['MASTER', 'ADMIN', 'SALES']), productsController.createProduct);

// Rutas Categorias
router.get('/products/get_categories', verifyToken, checkRole(['MASTER', 'ADMIN', 'SALES', 'WAREHOUSE']), categoriesController.getCategories);
router.post('/products/add_category', verifyToken, checkRole(['MASTER', 'ADMIN', 'SALES']), categoriesController.createCategory);

// Rutas Subcategorias
router.get('/products/get_subcategories', verifyToken, checkRole(['MASTER', 'ADMIN', 'SALES', 'WAREHOUSE']), subcategoriesController.getSubcategorys);
router.post('/products/add_subcategory', verifyToken, checkRole(['MASTER', 'ADMIN', 'SALES']), subcategoriesController.createSubcategory);

// Rutas Historial productos
router.get('/products/get_historial_products', verifyToken, checkRole(['MASTER', 'ADMIN', 'SALES', 'WAREHOUSE']), historyProductsController.getHistoryProducts);
router.post('/products/add_historial_products', verifyToken, checkRole(['MASTER', 'ADMIN', 'SALES', 'WAREHOUSE']), historyProductsController.createHistoryProduct);

module.exports = router;
