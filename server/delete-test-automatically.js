// const pgp = require("pg-promise")();
// const db = pgp("your_database_connection_string");

// // Function to delete expired tests
// async function deleteExpiredTests() {
//   try {
//     await db.none("DELETE FROM tests WHERE end_time <= NOW()");
//     console.log("Expired tests deleted successfully");
//   } catch (error) {
//     console.error("Error deleting expired tests:", error);
//   }
// }

// // Schedule the task to run every hour (adjust the cron schedule as needed)
// const cron = require("node-cron");
// cron.schedule("0 * * * *", deleteExpiredTests); // Run every hour

// // Start the cron job
// console.log("Scheduled task to delete expired tests started.");
