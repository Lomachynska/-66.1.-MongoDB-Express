const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/products/stream', async (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    const cursor = Product.find().cursor();

    res.write('[');
    let first = true;
    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      if (!first) res.write(',');
      res.write(JSON.stringify(doc));
      first = false;
    }
    res.write(']');
    res.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/products/stats', async (req, res) => {
  try {
    const stats = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          averagePrice: { $avg: '$price' },
          totalQuantity: { $sum: '$quantity' },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
