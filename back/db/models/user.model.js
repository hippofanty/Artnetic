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
    default: 'https://res.cloudinary.com/dcvhz3sqn/image/upload/c_scale,w_223/v1623181013/empty_onzxyb.png'
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
});

module.exports = model('Users', User);
