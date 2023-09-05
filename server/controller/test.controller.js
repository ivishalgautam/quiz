const { pool } = require("../config/db");

async function createTest(req, res) {
  try {
    const { name, level, test_type, start_time } = req.body;
    const { rows, rowCount } = await pool.query(
      `INSERT INTO tests (name, level, test_type, start_time) VALUES ($1, $2, $3, $4) returning *`,
      [name, parseInt(level), test_type, start_time]
    );
    res.json(rows[0]);
  } catch (error) {
    res.json({ message: error.message });
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
    res.json({ message: error.message });
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
    res.json({ message: error.message });
  }
}

async function getTests(req, res) {
  try {
    const { rows, rowCount } = await pool.query(`SELECT * FROM tests`);

    res.json(rows);
  } catch (error) {
    res.json({ message: error.message });
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

    res.json(rows[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
}

module.exports = {
  createTest,
  updateTestById,
  getTestById,
  getTests,
  deleteTestById,
};
