const express = require('express');
const router = express.Router();
const { products, chefCollections } = require('../data/db');

// ---------------------------------------------------------------------------
// GET /api/products/collections/chef
// Must be defined BEFORE /:id so Express does not treat "collections" as an id
// ---------------------------------------------------------------------------
router.get('/collections/chef', (req, res) => {
  return res.json({ chefCollections });
});

// ---------------------------------------------------------------------------
// GET /api/products
// Optional query params: ?category=classic|sport|light  &search=query
// ---------------------------------------------------------------------------
router.get('/', (req, res) => {
  let result = [...products];

  const { category, search } = req.query;

  if (category) {
    const cat = category.toLowerCase();
    result = result.filter((p) => p.category === cat);
  }

  if (search) {
    const term = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
    );
  }

  return res.json({ products: result, total: result.length });
});

// ---------------------------------------------------------------------------
// GET /api/products/:id
// ---------------------------------------------------------------------------
router.get('/:id', (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  return res.json({ product });
});

module.exports = router;
