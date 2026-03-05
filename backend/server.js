require("dotenv").config({ path: __dirname + "/.env" });
const express = require('express');
const cors = require("cors");
const pool = require('./db');

const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());

// API routes first (static must come after so /api/* is never served as files)
app.get("/health", (req, res) => {
  res.send("Backend is Running......");
});

app.get("/api/water-demand", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM water_demand ORDER BY date ASC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Predictions API (used by frontend and by Python train_model.py)
app.get("/api/predictions", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, date, zone_id, predicted_demand, created_at FROM predictions ORDER BY date ASC, zone_id"
    );
    res.json(result.rows || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/predictions", async (req, res) => {
  try {
    const body = req.body;
    // Accept either a raw array or { predictions: [...] }
    const items = Array.isArray(body) ? body : (body && body.predictions);
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Request body must be an array or { "predictions": [...] }' });
    }
    console.log("POST /api/predictions received", items.length, "predictions");
    let count = 0;
    for (const p of items) {
      const date = p.date;
      const zone_id = p.zone_id;
      const predicted_demand = Number(p.predicted_demand);
      if (!date || zone_id == null || Number.isNaN(predicted_demand)) continue;
      await pool.query(
        "INSERT INTO predictions (date, zone_id, predicted_demand) VALUES ($1, $2, $3)",
        [date, zone_id, predicted_demand]
      );
      count++;
    }
    res.json({ ok: true, count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve frontend last (index.html, app.js, styles.css)
app.use(express.static(path.join(__dirname)));

async function start() {
  try {
    if (pool.ensureSchema) await pool.ensureSchema();
  } catch (e) {
    console.warn('Schema init warning:', e.message);
  }
  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
}
start();
