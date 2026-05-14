const pool = require('../../db.js');

exports.findByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [
        email,
    ]);
    return result.rows[0];
};

exports.create = async ({ email, passwordHash }) => {
    const result = await pool.query(
        `
      INSERT INTO users(email, password_hash)
      VALUES($1, $2)
      RETURNING id, email, role, balance
      `,
        [email, passwordHash]
    );

    return result.rows[0];
};
