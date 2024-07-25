const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products/productsController');
const categoriesController = require('../controllers/products/categoriesController');
const subcategoriesController = require('../controllers/products/subcategorysController');
const historyProductsController = require('../controllers/products/historyProductsController');
const verifyToken = require('../middleware/verifyToken');
const checkRole = require('../middleware/checkRole');

//Rutas Productos
router.get('products/get_products', verifyToken, checkRole(['MASTER', 'ADMIN', 'VENTAS', 'ALMACEN']), productsController.getProducts);
router.post('products/add_product', verifyToken, checkRole(['MASTER', 'ADMIN', 'VENTAS']), productsController.createProduct);

//Rutas Categorias
router.post('products/get_categories', verifyToken, checkRole(['MASTER', 'ADMIN', 'VENTAS', 'ALMACEN']), categoriesController.getCategories);
router.post('products/add_category', verifyToken, checkRole(['MASTER', 'ADMIN', 'VENTAS']), categoriesController.createCategory);

//Rutas Subcategorias
router.post('products/get_subcategories', verifyToken, checkRole(['MASTER', 'ADMIN', 'VENTAS', 'ALMACEN']), subcategoriesController.getSubcategorys);
router.post('products/add_subcategory', verifyToken, checkRole(['MASTER', 'ADMIN', 'VENTAS']), subcategoriesController.createSubcategory);

//Rutas Historial productos
router.post('products/get_historial_products', verifyToken, checkRole(['MASTER', 'ADMIN', 'VENTAS', 'ALMACEN']), historyProductsController.getHistoryProducts);
router.post('products/add_historial_products', verifyToken, checkRole(['MASTER', 'ADMIN', 'VENTAS', 'ALMACEN']), historyProductsController.createHistoryProduct);

module.exports = router;
