const { Router } = require('express');
const router = Router();
const Category = require('../db/models/category.model');
const Work = require('../db/models/work.model');
const User = require('../db/models/user.model');


router.get('/:id',async (req, res) => {
	try {
    const { id } = req.params;
		
    const works = await Work.find({user: id}).populate(['category', 'user']);
    
		return res.status(200).json({works});
	} catch (error) {
		console.log(error);
    return res.sendStatus(400);
	}
});

router.post('/',async (req, res) => {
	try {
		console.log(req.body);
    const user = await User.findOne({_id: req.body.data.user.id})
    const category = await Category.findOne({name: req.body.data.category})
    const w = await Work.create({title: req.body.data.title, description: req.body.data.description, price: req.body.data.price, image: req.body.data.image, user: user._id, category: category._id,})
    const work = await Work.findOne({_id: w._id}).populate(['category', 'user']);
		return res.status(200).json({ work});
	} catch (error) {
		console.log(error);
	}
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
	try {
    const works = await Work.findOneAndDelete({ _id: id });
    return res.status(200).json({ status: 'removed' });
	} catch (error) {
		console.log(error);
    return res.sendStatus(400);
	}
});

module.exports = router;
