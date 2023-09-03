const { pool } = require("../config/db");

async function createQuestion(req, res) {
  const { question, answer, testId } = req.body;
  try {
    const { rows, rowCount } = await pool.query(
      `INSERT INTO questions (question, answer, test_id) VALUES ($1, $2, $3)`,
      [question, answer, parseInt(testId)]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateQuestionById(req, res) {
  const questionId = parseInt(req.params.questionId);
  const { ...data } = req.body;

  const updateColumns = Object.keys(data)
    .map((column, key) => `${column} = $${key + 1}`)
    .join(", ");
  const updateValues = Object.values(data);

  try {
    const { rows, rowCount } = await pool.query(
      `UPDATE questions SET ${updateColumns} WHERE id = $${
        updateValues + 1
      } returning *`,
      [...updateValues, questionId]
    );

    if (rowCount === 0)
      return res.status(404).json({ message: "Question not found!" });

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteQuestionById(req, res) {
  const questionId = parseInt(req.params.questionId);

  try {
    const { rowCount } = await pool.query(
      `DELETE FROM questions WHERE id = $1`,
      [questionId]
    );

    if (rowCount === 0)
      return res.status(404).json({ message: "Question not found!" });

    res.json({ message: "Question deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getQuestionById(req, res) {
  const questionId = parseInt(req.params.questionId);

  try {
    const { rowCount } = await pool.query(
      `SELECT * FROM questions WHERE id = $1`,
      [questionId]
    );

    if (rowCount === 0)
      return res.status(404).json({ message: "Question not found!" });

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getQuestions(req, res) {
  try {
    const { rows, rowCount } = await pool.query(`SELECT * FROM questions`);

    if (rowCount === 0)
      return res.status(404).json({ message: "Question not found!" });

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createQuestion,
  updateQuestionById,
  deleteQuestionById,
  getQuestionById,
  getQuestions,
};
