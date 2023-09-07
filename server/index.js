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
app.use("/api/admin/students", require("./router/student"));

// user
app.use("/api/questions", require("./router/question"));
app.use("/api/tests", require("./router/test"));

app.listen(PORT, () => {
  console.log(`Server up at http://locathost:${PORT}`);
});
