const { createConnection } = require('../config/conection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PasswordRegex = /^(?=.*\d)[A-Za-z\dÑñ@_-]{6,}$/;

exports.register = async (req, res) => {
    const { fullname, email, password, pwd, role } = req.body;

    if (!fullname || !email || !password || !pwd || !role) {
        return res.status(400).send({ message: 'All fields are required' });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const hashedPwd = bcrypt.hashSync(pwd, 8);

    try {
        const connection = await createConnection();
        const query = 'INSERT INTO users (fullname, email, password, pwd, role) VALUES (?, ?, ?, ?, ?)';
        
        await connection.execute(query, [fullname, email, hashedPassword, hashedPwd, role]);
        await connection.end();

        res.status(201).send({ message: 'User registered successfully' });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).send({ message: 'Email already exists' });
        }
        res.status(500).send({ message: 'Server error', error: err });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: 'Email and password are required' });
    }

    if (!EmailRegex.test(email)) {
        return res.status(400).send({ message: 'Email is not accepted' });
    }

    if (!PasswordRegex.test(password)) {
        return res.status(400).send({ message: 'Password is not accepted' });
    }

    try {
        const connection = await createConnection();
        const query = 'SELECT * FROM users WHERE email = ?';
        
        const [results] = await connection.execute(query, [email]);
        await connection.end();

        if (results.length === 0) return res.status(404).send({ message: 'User not found' });

        const user = results[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) return res.status(401).send({ message: 'Invalid password' });

        const token = jwt.sign({ id: user.id, role: user.role, status: user.status, fullname: user.fullname }, process.env.JWT_SECRET, {
            expiresIn: 86400
        });
        res.status(200).send({ auth: true, token });
    } catch (err) {
        res.status(500).send({ message: 'Server error' });
    }
};

exports.me = async (req, res) => {
    try {
        const connection = await createConnection();
        const query = 'SELECT id, fullname, email, role, status, created_at, updated_at FROM users WHERE id = ?';
        
        const [results] = await connection.execute(query, [req.userId]);
        await connection.end();

        if (results.length === 0) return res.status(404).send({ message: 'User not found' });

        res.status(200).send(results[0]);
    } catch (err) {
        res.status(500).send({ message: 'Server error', error: err });
    }
};
