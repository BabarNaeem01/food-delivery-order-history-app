const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const PORT = 4110;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "assignment3_app10"
});

app.get("/orders", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, order_code, order_date, total_price, items_summary FROM orders ORDER BY order_date DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Database error", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`App 10 server running on http://localhost:${PORT}`);
});
