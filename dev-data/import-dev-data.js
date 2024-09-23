const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Hospital = require('../models/hospitalModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

console.log('Connecting to database:', DB.replace(/\/\/.*@/, '//****:****@'));

mongoose
  .connect(DB)
  .then(() => {
    console.log('Database Connected Successfully');
    console.log('Connected to database:', mongoose.connection.db.databaseName);
  })
  .catch((err) => {
    console.error('Database connection Error:', err);
    process.exit(1);
  });

//   Read json file

const hospitals = JSON.parse(
  fs.readFileSync(`${__dirname}/health_facilities.json`, 'utf-8'),
);

// Import data into DB
const importData = async () => {
  try {
    await Hospital.create(hospitals);
    console.log('Data Sucessfully Loaded');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete All Data from DB
const deleteData = async () => {
  try {
    await Hospital.deleteMany();
    console.log('Data Sucessfully Deleted');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
