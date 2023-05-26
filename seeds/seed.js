const sequelize = require('../config/connection');
const { User, HighScore } = require('../models');

const userData = require('./userData.json');
const highScoreData = require('./highScoreData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // creating users
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  // creating highscore
  for (const highscore of highScoreData) {
    await HighScore.create(highscore);
  }

  process.exit(0);
};

seedDatabase();
