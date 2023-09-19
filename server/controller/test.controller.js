const { pool } = require("../config/db");

async function createTest(req, res) {
  try {
    const {
      name,
      grade,
      test_type,
      subject,
      start_time,
      end_time,
      duration,
      instructions,
    } = req.body;
    await pool.query(
      `INSERT INTO tests (name, grade, test_type, subject, start_time, end_time, duration, instructions) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`,
      [
        name,
        parseInt(grade),
        test_type,
        subject,
        start_time,
        end_time,
        duration,
        instructions,
      ]
    );
    res.json({ message: "Test created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateTestById(req, res) {
  const testId = parseInt(req.params.testId);
  const { ...data } = req.body;

  const updateColumns = Object.keys(data)
    .map((column, key) => `${column} = $${key + 1}`)
    .join(", ");
  const updateValues = Object.values(data);
  console.log(updateColumns, updateValues);

  try {
    const { rows, rowCount } = await pool.query(
      `UPDATE tests SET ${updateColumns} WHERE id = $${
        updateValues.length + 1
      } returning *`,
      [...updateValues, testId]
    );

    if (rowCount === 0)
      return res.status(404).json({ message: "Test not found!" });

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getTestById(req, res) {
  const testId = parseInt(req.params.testId);

  try {
    const { rows, rowCount } = await pool.query(
      `SELECT * FROM tests WHERE id = $1`,
      [testId]
    );

    if (rowCount === 0) return res.status(404).json("Test not found!");

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getTestInstructionsById(req, res) {
  const testId = parseInt(req.params.testId);

  try {
    const testDisabled = await pool.query(`SELECT * FROM tests WHERE id = $1`, [
      testId,
    ]);
    if (!testDisabled.rows[0].is_published) {
      return res.json([]);
    }

    const { rows, rowCount } = await pool.query(
      `SELECT id, instructions, duration FROM tests WHERE id = $1`,
      [testId]
    );

    if (rowCount === 0) return res.status(404).json("Test not found!");

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getStudentTestsByCategory(req, res) {
  const studentId = parseInt(req.params.studentId);
  try {
    const student = await pool.query(`SELECT * FROM students WHERE id = $1`, [
      studentId,
    ]);

    if (student.rowCount === 0)
      return res.status(404).json({ message: "Student not exist!" });

    if (student.rows[0].is_disabled === true) {
      return res.json([]);
    }

    if (!student.rows[0].payment_received) {
      const eligibilityTests = await pool.query(
        `SELECT t.*, q.total_questions
        FROM tests AS t
        JOIN (
            SELECT test_id, COUNT(*) AS total_questions
            FROM questions
            GROUP BY test_id
        ) AS q
        ON t.id = q.test_id
        WHERE t.is_published = true AND t.test_type = 'eligibility';`
      );
      return res.json(eligibilityTests.rows);
    }

    const package = student.rows[0].package;
    const grade = student.rows[0].grade;
    const test_assigned = student.rows[0].test_assigned;
    console.log({
      package,
      grade,
      test_assigned,
      subject: student.rows[0].subject,
    });

    const allTests = await pool.query(
      `SELECT t.*, q.total_questions
        FROM tests AS t
        JOIN (
            SELECT test_id, COUNT(*) AS total_questions
            FROM questions
            GROUP BY test_id
        ) AS q
        ON t.id = q.test_id
        WHERE t.is_published = true AND subject = $1;`,
      [student.rows[0].subject]
    );

    let tests;
    if (package === "dashboard") {
      let practiceTests = allTests.rows
        .filter((item) => item.test_type === "practice")
        .filter((item) => item.grade <= grade);
      tests = practiceTests;
    } else if (package === "olympiad") {
      tests = allTests.rows
        .filter((item) => item.id === parseInt(test_assigned))
        .filter((item) => item.grade <= grade);
      console.log({ test: allTests.rows });
    } else if (package === "polympiad") {
      // console.log(allTests.rows);
      tests = allTests.rows
        .filter(
          (item) =>
            item.test_type === "practice" || item.id === parseInt(test_assigned)
        )
        .filter((item) => item.grade <= grade);
    } else if (package === "eligibility") {
      tests = allTests.rows
        .filter((item) => item.test_type === "eligibility")
        .filter((item) => item.grade <= grade);
    }

    res.json(tests);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

async function getTests(req, res) {
  try {
    const { rows, rowCount } = await pool.query(
      `SELECT * FROM tests WHERE is_published = true`
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteTestById(req, res) {
  const testId = parseInt(req.params.testId);

  try {
    const { rows, rowCount } = await pool.query(
      `DELETE FROM tests WHERE id = $1`,
      [testId]
    );

    if (rowCount === 0) return res.status(404).json("Test not found!");

    res.json({ message: "Test deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// admin
async function getAdminTests(req, res) {
  try {
    const { rows, rowCount } = await pool.query(`
      SELECT t.*, q.total_questions FROM tests AS t
      LEFT JOIN (
        SELECT test_id, COUNT(*) AS total_questions
        FROM questions
        GROUP BY test_id
      ) AS q ON t.id = q.test_id`);
    // const { rows } = await pool.query(`SELECT * FROM tests`);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createTest,
  updateTestById,
  getTestById,
  getTests,
  getAdminTests,
  deleteTestById,
  getStudentTestsByCategory,
  getTestInstructionsById,
};
