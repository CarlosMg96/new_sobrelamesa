const { createConnection } = require('../../../config/conection');

exports.createCategory = async (req, res) => {
    const { category, classification, status } = req.body;

    if (!category || !classification || status === undefined) {
        return res.status(400).send({ message: 'All fields are required' });
    }

    try {
        const connection = await createConnection();
        const query = 'INSERT INTO Categories (category, classification, status) VALUES (?, ?, ?)';
        await connection.execute(query, [category, classification, status]);
        await connection.end();
        res.status(201).send({ message: 'Category created successfully' });
    } catch (err) {
        res.status(500).send({ message: 'Server error', error: err });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const connection = await createConnection();
        const [results] = await connection.execute('SELECT * FROM Categories');
        await connection.end();
        res.status(200).send(results);
    } catch (err) {
        res.status(500).send({ message: 'Server error', error: err });
    }
};

