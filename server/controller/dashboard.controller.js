const { pool } = require("../config/db");

async function getDashboardDetails(req, res) {
  try {
    const totalStudents = await pool.query(
      `SELECT 
           COUNT(*) as total_students,
           COUNT(CASE WHEN s.subject = 'abacus' THEN 1 ELSE NULL END) as abacus_students,
           COUNT(CASE WHEN s.subject = 'vedic' THEN 1 ELSE NULL END) as vedic_students,
           COUNT(CASE WHEN s.is_subscribed = 'true' THEN 1 ELSE NULL END) as subscribed_students,
           COUNT(CASE WHEN s.package = 'golden' THEN 1 ELSE NULL END) as golden_students,
           COUNT(CASE WHEN s.package = 'diamond' THEN 1 ELSE NULL END) as diamond_students
         FROM students as s;`
    );
    res.json(totalStudents.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}
module.exports = { getDashboardDetails };
