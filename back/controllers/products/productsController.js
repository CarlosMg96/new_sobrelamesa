const { createConnection } = require('../../config/conection');

exports.createProduct = async (req, res) => {
    const { product, subcategory_id, key, dimensions, image, maintenance_days, status } = req.body;

    if (!product || !subcategory_id || !key || status === undefined) {
        return res.status(400).send({ message: 'All fields are required' });
    }

    try {
        const connection = await createConnection();
        const query = 'INSERT INTO products (product, subcategory_id, product_key, dimensions, image, maintenance_days, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
        await connection.execute(query, [product, subcategory_id, key, dimensions, image, maintenance_days, status]);
        await connection.end();
        res.status(201).send({ message: 'Product created successfully' });
    } catch (err) {
        res.status(500).send({ message: 'Server error', error: err });
    }
};

exports.getProducts = async (req, res) => {
    let connection;
    try {
        connection = await createConnection();
       
        const page = Math.max(0, parseInt(req.query.page) || 0);
        const size = Math.max(1, parseInt(req.query.size) || 25);
        const offset = page * size;
        
        console.log('Page:', page, 'Size:', size, 'Offset:', offset);  // Para debugging
        console.log('Offset type:', typeof offset, 'Size type:', typeof size);
        console.log('Offset value:', offset, 'Size value:', size);

        // Cambio en la consulta SQL
        const [results] = await connection.execute(
            'SELECT * FROM products LIMIT ? OFFSET ?',
            [size, offset]
        );
       
        const [totalResults] = await connection.execute('SELECT COUNT(*) as count FROM products');
        const totalElements = totalResults[0].count;
        
        res.status(200).json({
            status: 200,
            message: "Success",
            data: {
                content: results,
                totalElements: totalElements,
                page: page,
                size: size
            }
        });
    } catch (err) {
        console.error('Error in getProducts:', err);
        res.status(500).json({
            status: 500,
            message: 'Server error',
            error: err.message
        });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
};



