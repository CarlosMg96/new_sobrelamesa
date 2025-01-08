const { createConnection } = require('../../config/conection');

exports.createHistoryProduct = async (req, res) => {
    const { product_id, stock, rental_price, replacement_cost, cost_excluding_taxes, cost, security_deposit } = req.body;

    if (!product_id) {
        return res.status(400).send({ message: 'Product ID is required' });
    }

    try {
        const connection = await createConnection();
        const query = 'INSERT INTO history_products (product_id, stock, rental_price, replacement_cost, cost_excluding_taxes, cost, security_deposit) VALUES (?, ?, ?, ?, ?, ?, ?)';
        await connection.execute(query, [product_id, stock, rental_price, replacement_cost, cost_excluding_taxes, cost, security_deposit]);
        await connection.end();
        res.status(201).send({ message: 'History Product created successfully' });
    } catch (err) {
        res.status(500).send({ message: 'Server error', error: err });
    }
};

exports.getHistoryProducts = async (req, res) => {
    try {
        const connection = await createConnection();
        const [results] = await connection.execute('SELECT * FROM history_products');
        await connection.end();
        res.status(200).send(results);
    } catch (err) {
        res.status(500).send({ message: 'Server error', error: err });
    }
};

