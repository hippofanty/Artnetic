const dbConnect = require('./config');
const Category = require('./models/category.model');

const categories = [
  'fineArt', 'graphics', 'abstraction', 'sculptures', 'other', 'all'
];

const seeder = () => {
  dbConnect();
  categories.map(async (category) => await Category.create({ name: category }));
};

seeder();
