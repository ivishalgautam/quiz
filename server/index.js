require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

// admin
app.use("/api/admin", require("./router/admin"));
app.use("/api/admin/levels", require("./router/level"));

// user
app.use("/api/students", require("./router/student"));
app.use("/api/questions", require("./router/question"));
app.use("/api/tests", require("./router/test"));
app.use("/api/results", require("./router/result"));

// auth
app.use("/api/auth", require("./router/auth"));

app.listen(PORT, () => {
  console.log(`Server up at http://locathost:${PORT}`);
});
