const { Router } = require('express');
const router = Router();
const Category = require('../db/models/category.model');
const Work = require('../db/models/work.model');

router.get('/', async (req, res) => {
  const categories = await Category.find();
  res.json({ categories });
});

router.get('/:id', (req, res) => {
  const works = await Work.find({ category: req.params.id });
  res.json({ works });
});

module.exports = router;
