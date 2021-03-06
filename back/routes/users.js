const { Router } = require('express');
const Order = require('../db/models/order.model');
const router = Router();
const User = require('../db/models/user.model');
const transporter = require('../emailConfig');
const emailTemplate = require('../emailTemplate');

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
router.put('/edit/:id', async (req, res) => {
  try {
const { id } = req.params;

const { firstname, lastname, email, phone, company, about } = req.body

const updatedUser = await User.findOneAndUpdate({_id: id}, {firstname, lastname, email, phone, company, about});
    return res.json({status: '200'});
  } catch (error) {
    console.log(error);
  }
});
router.put('/edit/avatar/:id', async (req, res) => {
  try {
const { id } = req.params;

const { avatar } = req.body

const updatedUser = await User.findOneAndUpdate({_id: id}, {avatar});
    return res.json({status: '200'});
  } catch (error) {
    console.log(error);
  }
});
router.put('/subscription/:id', async (req, res) => {
  try {
    const { id} = req.params;
    const { subscriptions} = req.body;
    const { email } = await User.findById(id).lean();

    // Отправка email
    await transporter.sendMail({
      from: process.env.EMAIL_LOGIN,
      to: email,
      subject: 'Подписка на рассылку ARTNETIC',
      text: 'Подписка на рассылку ARTNETIC',
      html: emailTemplate,
    });

    await User.findOneAndUpdate({_id: id}, {subscriptions});

    return res.json({status: '200'});
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
