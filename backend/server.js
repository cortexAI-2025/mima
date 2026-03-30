const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/loyalty', require('./routes/loyalty'));

// Health check
app.get('/health', (req, res) =>
  res.json({ status: 'ok', app: 'Mima Naturals API', version: '1.0.0' })
);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(3001, () =>
  console.log('🌿 Mima Naturals API running on http://localhost:3001')
);
