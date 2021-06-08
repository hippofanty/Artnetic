require('dotenv').config()

const dbConnect = require('./config');
const Category = require('./models/category.model');
const User = require('./models/user.model');
const bcrypt = require('bcrypt');

const categories = [
  'fineArt', 'graphics', 'abstraction', 'sculptures', 'other', 'all'
];

// const seeder = () => {
//   dbConnect();
//   categories.map(async (category) => await Category.create({ name: category }));
// };

// seeder();

const addAdmin = async () => {
  dbConnect();
  const saltRounds = Number(process.env.SALT_ROUNDS);
  const password = '123321';
  const hashPassword = await bcrypt.hash(password, saltRounds);

  await User.create({
    username: 'Vladislav',
    email: 'vladi@gmail.com',
    password: hashPassword,
    role: 'Admin',
  });
};

addAdmin();
