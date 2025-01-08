const { createConnection } = require('../config/conection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PasswordRegex = /^(?=.*\d)[A-Za-z\dÑñ@_-]{6,}$/;

exports.register = async (req, res) => {
    const { fullname, email, password, pwd, role } = req.body;

    if (!fullname || !email || !password || !pwd || !role) {
        return res.status(400).json({
            status: 400,
            message: 'All fields are required',
            data: []
        });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const hashedPwd = bcrypt.hashSync(pwd, 8);

    try {
        const connection = await createConnection();
        const query = 'INSERT INTO users (fullname, email, password, pwd, role) VALUES (?, ?, ?, ?, ?)';
        
        await connection.execute(query, [fullname, email, hashedPassword, hashedPwd, role]);
        await connection.end();

        res.status(201).json({
            status: 201,
            message: 'User registered successfully',
            data: []
        });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                status: 409,
                message: 'Email already exists',
                data: []
            });
        }
        res.status(500).json({
            status: 500,
            message: 'Server error',
            data: []
        });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            status: 400,
            message: 'Email and password are required',
            data: []
        });
    }

    if (!EmailRegex.test(email)) {
        return res.status(400).json({
            status: 400,
            message: 'Email is not accepted',
            data: []
        });
    }

    if (!PasswordRegex.test(password)) {
        return res.status(400).json({
            status: 400,
            message: 'Password is not accepted',
            data: []
        });
    }

    try {
        const connection = await createConnection();
        const query = 'SELECT * FROM users WHERE email = ?';
        
        const [results] = await connection.execute(query, [email]);
        await connection.end();

        if (results.length === 0) return res.status(404).json({
            status: 404,
            message: 'User not found',
            data: []
        });

        const user = results[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) return res.status(401).json({
            status: 401,
            message: 'Invalid password',
            data: []
        });

        const token = jwt.sign({ id: user.id, role: user.role, status: user.status, fullname: user.fullname }, process.env.JWT_SECRET, {
            expiresIn: 86400
        });
        
        res.status(200).json({
            status: 200,
            message: "Success",
            data: {
                role: user.role,
                token: token
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

exports.me = async (req, res) => {
    try {
        const connection = await createConnection();
        const query = 'SELECT id, fullname, email, role, status, created_at, updated_at FROM users WHERE id = ?';
        
        const [results] = await connection.execute(query, [req.userId]);
        await connection.end();

        if (results.length === 0) return res.status(404).json({
            status: 404,
            message: 'User not found',
            data: []
        });

        res.status(200).json({
            status: 200,
            message: 'Success',
            data: results[0]
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Server error',
            data: []
        });
    }
};

exports.get_users = async (req, res) => {
    const { page = 1, size = 10 } = req.query;  // Assuming pagination
    const offset = (page - 1) * size;
    try {
        const connection = await createConnection();
        const query = 'SELECT id, fullname, email, role, status, created_at, updated_at FROM users LIMIT ? OFFSET ?';
        
        const [results] = await connection.execute(query, [Number(size), Number(offset)]);
        await connection.end();

        if (results.length === 0) return res.status(404).json({
            status: 404,
            message: 'User not found',
            data: []
        });

        const totalElementsQuery = 'SELECT COUNT(*) AS total FROM users';
        const [totalResult] = await connection.execute(totalElementsQuery);
        const totalElements = totalResult[0].total;

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
        res.status(500).json({
            status: 500,
            message: 'Server error',
            data: []
        });
    }
};
