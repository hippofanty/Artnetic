const { Router } = require('express');
const router = Router();
const Category = require('../db/models/category.model');
const Work = require('../db/models/work.model');
const User = require('../db/models/user.model');

router.post('/',async (req, res) => {
	try {
		console.log(req.body);
    const user = await User.findOne({_id: req.body.data.user.id})
    const category = await Category.findOne({name: req.body.data.category})
    await Work.create({title: req.body.data.title, description: req.body.data.description, price: req.body.data.price, image: req.body.data.image, user: user._id, category: category._id,})
		return res.sendStatus(200);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
