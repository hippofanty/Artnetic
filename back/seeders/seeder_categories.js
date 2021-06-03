require('dotenv').config();
const { connect, connection } = require("mongoose");
const Categories = require("../db/models/category.model");
const Works = require("../db/models/work.model");

const dbConnectionURL = process.env.DB_URL;
console.log(dbConnectionURL);
async function main() {
  await connect(dbConnectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  const fineArt = 
    {
      name: "fineArt",
    }
    const graphics = {
      name: "graphics",
    }
   const abstraction = {
      name: "abstraction",
    }
   const  sculptures =  {
      name: "sculptures",
    }
    const other = {
      name: "other",
    }
    const all = {
      name: "all",
    }
    
  await Categories.create(fineArt, graphics, abstraction, sculptures, other, all);
  const cat = await Categories.find().lean();
  
  const worksList = [
    {
      title: "Картина 1",
      description: "Картина как картина",
      price: 4000,
      category: cat[0]._id
    },
    {
      title: "Картина 2",
      description: "Картина как картина 2",
      price: 9000,
      category: cat[0]._id
    },
    {
      title: "Скульптура 1",
      description: "Скульптура как скульптура",
      price: 6000,
      category: cat[3]._id
    },
    {
      title: "Скульптура 2",
      description: "Скульптура как скульптурааааа",
      price: 10000,
      category: cat[3]._id
    },
    {
      title: "Великая абстракция",
      description: "абстракция как абстракция!",
      price: 100000,
      category: cat[2]._id
    },
  ];
  await Works.insertMany(worksList);


  await connection.close();
}

main();

//"mongodb://localhost:27017/art"
