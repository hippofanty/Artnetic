const { Router } = require('express');
const Order = require('../db/models/order.model');
const router = Router();
const User = require('../db/models/user.model');

router.route('/:userId/orders').get(async (req, res) => {
	try {
		const { userId } = req.params;
		const orders = await Order.find({ user: userId }).populate([
			'user',
			'work',
		]);
		const approvedOrders = orders.filter(
			(order) => order.status === 'Approved'
		);
		res.status(200).json({ approvedOrders });
	} catch (error) {
		console.log(error);
		return res.status(500);
	}
});

module.exports = router;
