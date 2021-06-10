const { Schema, model } = require('mongoose');

const User = new Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	firstname: {
		type: String,

	},
	lastname: {
		type: String,
	},
	phone: {
		type: String,
	},
	company: {
		type: String,
	},
	about: {
		type: String,
	},
	avatar: {
		type: String,
    default: 'https://res.cloudinary.com/dcvhz3sqn/image/upload/v1623328544/avatars/y6lwlllzujkkoxqdyujd.png'
	},
	role: {
		type: String,
		default: 'Guest',
	},
	favourites: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Works',
		},
	],
	works: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Works',
		},
	],
	subscriptions: [String],
});

module.exports = model('Users', User);
