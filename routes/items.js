const express = require('express');
const router = express.Router();
const items = require('../fakeDb');

// GET /items - this should render a list of shopping items.
router.get('/', (req, res) => {
  res.json(items);
});

// POST /items - this route should accept JSON data and add it to the shopping list.
router.post('/', (req, res) => {
    const newItem = {name: req.body.name, price: req.body.price};
    items.push(newItem);
    res.status(201).json({ added: newItem });
});

// GET /items/:name - this should get a specific item by name
router.get('/:name', (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name);
    if (foundItem) {
        res.json(foundItem);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

// PATCH /items/:name - update a specific item by name
router.patch('/:name', (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name);
    if (foundItem) {
      foundItem.name = req.body.name || foundItem.name;
      foundItem.price = req.body.price || foundItem.price;
      res.json({ updated: foundItem });
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  });

// DELETE /items/:name - delete a specific item by name
router.delete('/:name', (req, res) => {
    const itemIndex = items.findIndex(item => item.name === req.params.name);
    if (itemIndex !== -1) {
      items.splice(itemIndex, 1);
      res.json({ message: 'Deleted' });
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  });

module.exports = router;