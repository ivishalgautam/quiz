const { pool } = require("../config/db");

async function login(req, res) {
  const { username, password } = req.body;
  console.log(req.body);

  try {
    const studentExist = await pool.query(
      `SELECT * FROM student_credentials WHERE username = $1`,
      [username]
    );

    if (studentExist.rowCount === 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (studentExist.rows[0].password !== password) {
      return res.json({ message: "Wrong credentials!" });
    }

    const student = await pool.query(
      `SELECT id, firstname, lastname, level_id, package, email FROM students WHERE id = $1`,
      [studentExist.rows[0].student_id]
    );

    res.json(student.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = { login };
