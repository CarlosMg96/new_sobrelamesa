const { createConnection } = require('../../config/conection');

exports.createCategory = async (req, res) => {
    const { category, classification, status } = req.body;

    if (!category || !classification || status === undefined) {
        return res.status(400).json({
            status: 400,
            message: 'All fields are required',
            data: []
        });
    }

    try {
        const connection = await createConnection();
        const query = 'INSERT INTO categories (category, classification, status) VALUES (?, ?, ?)';
        await connection.execute(query, [category, classification, status]);
        await connection.end();
        
        res.status(200).json({
            status: 200,
            message: 'Category created successfully',
            data: []
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Server error',
            data: []
        });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const connection = await createConnection();
        const [results] = await connection.execute('SELECT * FROM Categories');
        await connection.end();

        if (results.length === 0) {
            return res.status(404).json({
                status: 404,
                message: 'No categories found',
                data: []
            });
        }

        res.status(200).json({
            status: 200,
            message: "Success",
            data: {
                content: results,
                totalElements: results.length,
                page: 1,  // Paginación, puedes ajustar según lo necesites
                size: results.length
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Server error',
            data: []
        });
    }
};
