const { pool } = require("../config/db");

async function createLevel(req, res) {
  try {
    const { name } = req.body;
    const levelExist = await pool.query(`SELECT * FROM levels WHERE id = $1`, [
      name,
    ]);
    if (levelExist.rowCount > 0) {
      return res.status(400).json({ message: `Level ${name} already exist!` });
    }
    const { rows, rowCount } = await pool.query(
      `INSERT INTO levels (id, name) VALUES ($1, $2) returning *`,
      [parseInt(name), `Level ${name}`]
    );
    res.json({ message: "Level created successfully." });
  } catch (error) {
    res.json({ message: error.message });
  }
}

async function updateLevelById(req, res) {
  const levelId = parseInt(req.params.levelId);
  const { name } = req.body;
  try {
    const { rows, rowCount } = await pool.query(
      `UPDATE levels SET name = $1 WHERE id = $2 returning *`,
      [name, levelId]
    );

    if (rowCount === 0)
      return res.status(404).json({ message: "Level not found!" });

    res.json(rows[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
}

async function getLevelById(req, res) {
  const levelId = parseInt(req.params.levelId);

  try {
    const { rows, rowCount } = await pool.query(
      `SELECT * FROM levels WHERE id = $1`,
      [levelId]
    );

    if (rowCount === 0)
      return res.status(404).json({ message: "Level not found!" });

    res.json(rows[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
}

async function getLevels(req, res) {
  try {
    const { rows, rowCount } = await pool.query(`SELECT * FROM levels`);

    res.json(rows);
  } catch (error) {
    res.json({ message: error.message });
  }
}

async function deleteLevelById(req, res) {
  const levelId = req.params.levelId;
  console.log(levelId);
  try {
    const { rows, rowCount } = await pool.query(
      `DELETE FROM levels WHERE id = $1`,
      [levelId]
    );

    if (rowCount === 0) return res.status(404).json("Level not found!");

    res.json({ message: "Level deleted successfully." });
  } catch (error) {
    res.json({ message: error.message });
  }
}

module.exports = {
  createLevel,
  updateLevelById,
  getLevelById,
  getLevels,
  deleteLevelById,
};
