require("dotenv").config({ path: __dirname + "/.env" });
const express = require('express')
const cors = require("cors")
const {Pool} = require("pg")

const app = express();
app.use(cors())
app.use(express.json())

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

app.get("/",(req,res) => {
    res.send("Backend is Running......")
});

app.get("/api/water-demand", async(req,res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM water_demand ORDER BY date ASC"
        );
        res.json(result.rows);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});