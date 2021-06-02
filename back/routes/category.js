const { Router } = require('express');
const router = Router();
const Category = require('../db/models/category.model');
const Work = require('../db/models/work.model');

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ categories });
  } catch (error) {
    console.log(error);
  }
});

router.get('/:name', async (req, res) => {
  try {
    if (req.params.name === 'all') {
      const works = await Work.find().populate([category, user]);
      return res.json({ works });
    }
    const works = await Work.find({ category: req.params.id }).populate([category, user]);
    return res.json({ works });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
