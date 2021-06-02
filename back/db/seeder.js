const dbConnect = require('./config');
const Category = require('./models/category.model');

const categories = [
  'Живопись',
  'Графика',
  'Объект',
  'Фотография',
  'Коллаж',
  'Видео',
  'Принты',
  'Абстракция',
  'Пейзаж',
  'Портрет',
  'Скульптура',
  'Иное',
];

const seeder = () => {
  dbConnect();
  categories.map(async (category) => await Category.create({ name: category }));
};

seeder();
