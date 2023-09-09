const { pool } = require("../config/db");

async function createResult(req, res) {
  const {
    student_id,
    test_id,
    student_points,
    total_points,
    student_attempted,
    total_questions,
  } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO student_results (student_id, test_id, student_points, total_points, student_attempted,total_questions)
      VALUES ($1, $2, $3, $4, $5, $6) returning *`,
      [
        student_id,
        test_id,
        student_points,
        total_points,
        student_attempted,
        total_questions,
      ]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getResults(req, res) {
  try {
    const { rows, rowCount } = await pool.query(`
      SELECT 
            sr.*, 
            s.id as student_id, 
            s.firstname, 
            s.lastname, 
            t.id as test_id, 
            t.name as test_name
        FROM 
            student_results sr
        JOIN 
            students s ON sr.student_id = s.id
        JOIN 
            test t on sr.test_id = t.id`);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getStudentResults(req, res) {
  const studentId = parseInt(req.params.studentId);
  try {
    const { rows, rowCount } = await pool.query(
      `
      SELECT 
            sr.*, 
            s.id as student_id, 
            s.firstname, 
            s.lastname, 
            t.id as test_id, 
            t.name as test_name
        FROM 
            student_results sr
        JOIN 
            students s ON sr.student_id = s.id
        JOIN 
            tests t on sr.test_id = t.id
        WHERE 
            student_id = $1 
        ORDER BY `,

      [studentId]
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { createResult, getResults, getStudentResults };
