const { createConnection } = require('../../../config/conection');

exports.createSubcategory = async (req, res) => {
    const { subcategory, category_id, status } = req.body;

    if (!subcategory || !category_id || status === undefined) {
        return res.status(400).send({ message: 'All fields are required' });
    }

    try {
        const connection = await createConnection();
        const query = 'INSERT INTO Subcategorys (subcategory, category_id, status) VALUES (?, ?, ?)';
        await connection.execute(query, [subcategory, category_id, status]);
        await connection.end();
        res.status(201).send({ message: 'Subcategory created successfully' });
    } catch (err) {
        res.status(500).send({ message: 'Server error', error: err });
    }
};

exports.getSubcategorys = async (req, res) => {
    try {
        const connection = await createConnection();
        const [results] = await connection.execute('SELECT * FROM Subcategorys');
        await connection.end();
        res.status(200).send(results);
    } catch (err) {
        res.status(500).send({ message: 'Server error', error: err });
    }
};

