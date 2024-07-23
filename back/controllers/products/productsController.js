const { createConnection } = require('../../../config/conection');

exports.createProduct = async (req, res) => {
    const { product, subcategory_id, key, dimensions, image, maintenance_days, status } = req.body;

    if (!product || !subcategory_id || !key || status === undefined) {
        return res.status(400).send({ message: 'All fields are required' });
    }

    try {
        const connection = await createConnection();
        const query = 'INSERT INTO Products (product, subcategory_id, key, dimensions, image, maintenance_days, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
        await connection.execute(query, [product, subcategory_id, key, dimensions, image, maintenance_days, status]);
        await connection.end();
        res.status(201).send({ message: 'Product created successfully' });
    } catch (err) {
        res.status(500).send({ message: 'Server error', error: err });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const connection = await createConnection();
        const [results] = await connection.execute('SELECT * FROM Products');
        await connection.end();
        res.status(200).send(results);
    } catch (err) {
        res.status(500).send({ message: 'Server error', error: err });
    }
};

