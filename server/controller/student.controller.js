const { pool } = require("../config/db");
const {
  generateUsername,
  generatePassword,
} = require("../helper/credentialGenerator");
const { sendEmail } = require("../helper/mailer");

async function createStudent(req, res) {
  const {
    firstname,
    lastname,
    email,
    phone,
    father_name,
    mother_name,
    dob,
    city,
    state,
    address,
    subject,
    package,
    level_id,
  } = req.body;
  try {
    const { rows, rowCount } = await pool.query(
      `INSERT INTO students (firstname, lastname, email, phone, father_name, mother_name, dob, city, state, address, subject, package, level_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) returning *`,
      [
        firstname,
        lastname,
        email,
        phone,
        father_name,
        mother_name,
        dob,
        city,
        state,
        address,
        subject,
        package,
        level_id,
      ]
    );
    res.json(rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

async function updateStudentById(req, res) {
  const studentId = parseInt(req.params.studentId);
  const { ...data } = req.body;

  const updateColumns = Object.keys(data)
    .map((column, key) => `${column} = $${key + 1}`)
    .join(", ");

  const updateValues = Object.values(data);

  try {
    const { rows, rowCount } = await pool.query(
      `UPDATE students SET ${updateColumns} WHERE id = $${
        updateValues.length + 1
      } returning *`,
      [...updateValues, studentId]
    );

    if (rowCount === 0)
      return res.status(404).json({ message: "Student not found!" });

    res.json(rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

async function deleteStudentById(req, res) {
  const studentId = parseInt(req.params.studentId);
  try {
    const { rowCount } = await pool.query(
      `DELETE FROM students WHERE id = $1`,
      [studentId]
    );
    res.json({ message: "Student delete successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

async function getStudentById(req, res) {
  const studentId = parseInt(req.params.studentId);
  try {
    const { rows, rowCount } = await pool.query(
      `SELECT * FROM students WHERE id = $1`,
      [studentId]
    );

    if (rowCount === 0)
      return res.status(404).json({ message: "Student not found!" });

    res.json(rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

async function getStudents(req, res) {
  try {
    const { rows } = await pool.query(`SELECT * FROM students;`);

    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

// ADMIN
async function generateCredentials(req, res) {
  const studentId = parseInt(req.params.studentId);
  try {
    const studentExist = await pool.query(
      `SELECT * FROM students WHERE id = $1`,
      [studentId]
    );
    console.log(studentExist.rows[0]);

    if (studentExist.rowCount === 0)
      return res.status(404).json({ message: "Student not exist!" });

    const { firstname, lastname, id, dob, email } = studentExist.rows[0];
    const username = await generateUsername(firstname, lastname, id);
    const password = await generatePassword(dob);

    const credentialsExist = await pool.query(
      `SELECT * FROM student_credentials WHERE student_id = $1`,
      [studentId]
    );
    if (credentialsExist.rowCount > 0) {
      return res.json({ message: "Already created!" });
    }

    const credentials = await pool.query(
      `INSERT INTO student_credentials (username, password, student_id) VALUES ($1, $2, $3) returning *`,
      [username, password, studentId]
    );

    if (credentials.rowCount > 0) {
      await pool.query(
        `UPDATE students SET credentials_created = $1 WHERE id = $2`,
        [true, studentId]
      );
      sendEmail(email, username, password);
    }

    res.json({ message: `Credentials created and sent to: ${email}` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createStudent,
  updateStudentById,
  deleteStudentById,
  getStudentById,
  getStudents,
  generateCredentials,
};
