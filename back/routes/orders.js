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
		res.status(200).json({ allApprovedOrders });
	} catch (error) {
		console.log(error);
		return res.status(500);
	}
});

router
	.route('/')
	.get(async (req, res) => {
		try {
			const allOrders = await Order.find().populate(['user', 'work']);
			res.status(200).json({ allOrders });
		} catch (error) {
			console.log(error);
			return res.status(500);
		}
	})
	.delete(async (req, res) => {
		try {
			const { ordersToDelete } = req.body;
			await Order.deleteMany({
				_id: {
					$in: ordersToDelete,
				},
			});
			res.status(200).json({ message: 'Successfully deleted!' });
		} catch (error) {
			return res.status(500);
		}
	})
	.put(async (req, res) => {
		try {
			const { ordersToUpdate } = req.body;

			await Order.updateMany(
				{
					_id: {
						$in: ordersToUpdate,
					},
				},
				{ status: 'Approved' }
			);
			const updatedOrders = await Order.find({
				_id: {
					$in: ordersToUpdate,
				},
			}).populate('work');
			res.status(200).json({ updatedOrders });
		} catch (error) {
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
