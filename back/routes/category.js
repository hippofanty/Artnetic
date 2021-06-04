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
			const works = await Work.find().populate(['category', 'user']);
			return res.json({ works });
		}
    const cat = await Category.findOne({name: req.params.name}).lean()
		const works = await Work.find({ category: cat._id }).populate([
			'category',
			'user',
		]);

    console.log(works);
		return res.status(200).json({ works });
	} catch (error) {
		console.log(error);
    return res.status(405);
	}
});

router.get('/works/:id', async (req, res) => {
	const work = await Work.findOne({ _id: req.params.id }).populate(['category', 'user']);
	res.json({ work });
});

module.exports = router;
