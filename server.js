const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/detect", (req, res) => {
  const { x, y, z } = req.body;
  console.log(`Motion detected: X=${x}, Y=${y}, Z=${z}`);

  if (Math.abs(x) > 5 || Math.abs(y) > 5) {
    return res.status(200).json({ message: "Distracted driving detected!" });
  }

  res.status(200).json({ message: "Safe driving!" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
