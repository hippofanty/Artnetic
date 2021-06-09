const { Router } = require('express');
const Order = require('../db/models/order.model');
const router = Router();

router.route('/new').post(async (req, res) => {
	try {
		const { vendorCode, notes, city, date, user, work } = req.body;
		const newOrder = await Order.create({
			vendorCode,
			notes,
			city,
			date,
			user,
			work,
		});
		res.status(200).json({ message: 'Successfully created!' });
	} catch (error) {
		console.log(error);
		return res.status(500);
	}
});

router.route('/approved').get(async (req, res) => {
	try {
		const allOrders = await Order.find().populate(['user', 'work']);
		const allApprovedOrders = allOrders.filter(
      (order) => order.status === 'Approved'
      );
    console.log('СТАТУС APPROVED:', allApprovedOrders)
		res.status(200).json({ allApprovedOrders });
	} catch (error) {
		console.log(error);
		return res.status(500);
	}
});

router.route('/').get(async (req, res) => {
	try {
		const allOrders = await Order.find().populate(['user', 'work']);
    console.log('ВСЕ ЗАКАЗЫ:', allOrders)
		res.status(200).json({ allOrders });
	} catch (error) {
		console.log(error);
		return res.status(500);
	}
});

module.exports = router;

// vendorCode: cryptoRandomString({length: 10, type: 'base64'}),
// notes: values.notes,
// city: values.city,
// date: values.date,
// user: user.id,
// work: workId,
