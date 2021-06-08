const { Router } = require('express');
const router = Router();
const Category = require('../db/models/category.model');
const Work = require('../db/models/work.model');

router.get('/', async (req, res) => {
  res.json({});
});

router.post('/', async (req, res) => {
  try {
    const categories = await Category.find({name: { $regex: req.body.query, $options: 'i'}}).lean();
    let categoryResults = [];
    categories.map((el) => {
      categoryResults.push(el.name);
    })
    const workResults = await Work.find({title: {$regex: req.body.query, $options: 'i'}}).lean();
    return res.json({categoryResults, workResults});
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
