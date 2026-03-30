const express = require('express');
const router = express.Router();
const { users, loyaltyHistory, getLoyaltyLevel } = require('../data/db');
const authMiddleware = require('../middleware/auth');

// All loyalty routes are protected
router.use(authMiddleware);

// ---------------------------------------------------------------------------
// Reward catalogue — points cost for each reward
// ---------------------------------------------------------------------------
const REWARDS = {
  free_drink: { label: 'مشروب مجاني', cost: 50 },
  free_dessert: { label: 'حلوى مجانية', cost: 100 },
  discount_10: { label: 'خصم 10%', cost: 150 },
  discount_20: { label: 'خصم 20%', cost: 250 },
  free_meal: { label: 'وجبة مجانية', cost: 500 },
};

// ---------------------------------------------------------------------------
// GET /api/loyalty/card  — return loyalty card data for the current user
// ---------------------------------------------------------------------------
router.get('/card', (req, res) => {
  const user = users.find((u) => u.id === req.userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const history = loyaltyHistory
    .filter((h) => h.userId === req.userId)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // Next level threshold
  const levelThresholds = { bronze: 300, silver: 700, gold: 1200, platinum: null };
  const nextThreshold = levelThresholds[user.level];

  return res.json({
    points: user.points,
    level: user.level,
    memberId: user.memberId,
    nextLevelIn: nextThreshold !== null ? Math.max(0, nextThreshold - user.points) : 0,
    history,
    availableRewards: Object.entries(REWARDS).map(([key, val]) => ({
      id: key,
      label: val.label,
      cost: val.cost,
      canRedeem: user.points >= val.cost,
    })),
  });
});

// ---------------------------------------------------------------------------
// POST /api/loyalty/redeem  — redeem points for a reward
// Body: { reward: 'free_drink' | 'free_dessert' | 'discount_10' | 'discount_20' | 'free_meal' }
// ---------------------------------------------------------------------------
router.post('/redeem', (req, res) => {
  const { reward } = req.body;

  if (!reward) {
    return res.status(400).json({ error: 'reward is required' });
  }

  const rewardDef = REWARDS[reward];
  if (!rewardDef) {
    return res.status(400).json({
      error: `Unknown reward. Valid options: ${Object.keys(REWARDS).join(', ')}`,
    });
  }

  const user = users.find((u) => u.id === req.userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (user.points < rewardDef.cost) {
    return res.status(400).json({
      error: `Not enough points. Required: ${rewardDef.cost}, available: ${user.points}`,
    });
  }

  // Deduct points
  user.points -= rewardDef.cost;
  user.level = getLoyaltyLevel(user.points);

  // Record redemption in history as a negative entry
  loyaltyHistory.push({
    userId: req.userId,
    date: new Date().toISOString().split('T')[0],
    description: `استرداد: ${rewardDef.label}`,
    amount: 0,
    points: -rewardDef.cost,
  });

  return res.json({
    message: `تم استرداد ${rewardDef.label} بنجاح`,
    reward: rewardDef.label,
    pointsUsed: rewardDef.cost,
    remainingPoints: user.points,
    level: user.level,
  });
});

module.exports = router;
