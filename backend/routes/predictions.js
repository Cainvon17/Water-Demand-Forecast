const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/predictions - return all predictions
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, date, zone_id, predicted_demand, created_at FROM predictions ORDER BY date ASC, zone_id'
    );
    res.json(result.rows || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/predictions - accept predictions from Python ML script
router.post('/', async (req, res) => {
  try {
    const { predictions: items } = req.body || {};
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Request body must include a "predictions" array' });
    }
    const inserted = [];
    for (const p of items) {
      const date = p.date;
      const zone_id = p.zone_id;
      const predicted_demand = Number(p.predicted_demand);
      if (!date || zone_id == null || Number.isNaN(predicted_demand)) continue;
      await pool.query(
        'INSERT INTO predictions (date, zone_id, predicted_demand) VALUES ($1, $2, $3)',
        [date, zone_id, predicted_demand]
      );
      inserted.push({ date, zone_id, predicted_demand });
    }
    res.json({ ok: true, count: inserted.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
