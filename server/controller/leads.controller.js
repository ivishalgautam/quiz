const { pool } = require("../config/db");

async function createLead(req, res) {
  const { fullname, email, phone, gaurdian_name } = req.body;
  try {
    const leadExist = await pool.query(
      `SELECT * FROM leads WHERE phone = $1 OR email = $2`,
      [phone, email]
    );

    if (leadExist.rowCount > 0) {
      return res.status(403).json({ message: "You already registered" });
    }

    await pool.query(
      `INSERT INTO leads (fullname, email, phone, gaurdian_name) VALUES ($1, $2, $3, $4)`,
      [fullname, email, phone, gaurdian_name]
    );
    res.json({ message: "Registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

async function deleteLeadById(req, res) {
  const leadId = parseInt(req.params.leadId);
  try {
    const { rowCount } = await pool.query(`DELETE FROM leads WHERE id = $1`, [
      leadId,
    ]);

    if (rowCount === 0) {
      return res.status(404).json({ message: "Lead not exist!" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

async function getLeadById(req, res) {
  const leadId = parseInt(req.params.leadId);
  try {
    const { rows, rowCount } = await pool.query(
      `SELECT * FROM leads WHERE id = $1`,
      [leadId]
    );

    if (rowCount === 0) {
      return res.status(404).json({ message: "Lead not exist!" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

async function getAllLeads(req, res) {
  try {
    const { rows, rowCount } = await pool.query(`SELECT * FROM leads;`);

    if (rowCount === 0) {
      return res.json({ message: "Leads not found!" });
    }

    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = { createLead, deleteLeadById, getLeadById, getAllLeads };
