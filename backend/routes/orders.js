const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const { orders, products, users, loyaltyHistory, getLoyaltyLevel } = require('../data/db');
const authMiddleware = require('../middleware/auth');

// All order routes are protected
router.use(authMiddleware);

// ---------------------------------------------------------------------------
// POST /api/orders  — create a new order
// Body: { items: [{ productId, qty }] }
// ---------------------------------------------------------------------------
router.post('/', (req, res) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'items array is required and must not be empty' });
  }

  // Resolve each item against the product catalogue
  const resolvedItems = [];
  for (const item of items) {
    const { productId, qty } = item;

    if (!productId || !qty || typeof qty !== 'number' || qty < 1) {
      return res.status(400).json({
        error: `Invalid item: productId and a positive numeric qty are required`,
      });
    }

    const product = products.find((p) => p.id === productId);
    if (!product) {
      return res.status(404).json({ error: `Product not found: ${productId}` });
    }

    resolvedItems.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      qty,
    });
  }

  const total = resolvedItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const pointsEarned = Math.floor(total / 10);

  const order = {
    id: uuidv4(),
    userId: req.userId,
    items: resolvedItems,
    total,
    points: pointsEarned,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };

  orders.push(order);

  // Update user's points and level
  const user = users.find((u) => u.id === req.userId);
  if (user) {
    user.points += pointsEarned;
    user.level = getLoyaltyLevel(user.points);

    // Record in loyalty history
    const description = resolvedItems.map((i) => i.name).join(' + ');
    loyaltyHistory.push({
      userId: req.userId,
      date: new Date().toISOString().split('T')[0],
      description,
      amount: total,
      points: pointsEarned,
    });
  }

  return res.status(201).json({ order });
});

// ---------------------------------------------------------------------------
// GET /api/orders  — list all orders for the authenticated user
// ---------------------------------------------------------------------------
router.get('/', (req, res) => {
  const userOrders = orders
    .filter((o) => o.userId === req.userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return res.json({ orders: userOrders, total: userOrders.length });
});

// ---------------------------------------------------------------------------
// GET /api/orders/:id  — get a single order (must belong to the user)
// ---------------------------------------------------------------------------
router.get('/:id', (req, res) => {
  const order = orders.find(
    (o) => o.id === req.params.id && o.userId === req.userId
  );

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  return res.json({ order });
});

module.exports = router;
