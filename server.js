const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! ⛔️ Shutting Down....');
  console.log(err.name, err.message);
  process.exit(1);
});

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: './config.env' });
}

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => {
    console.log('DataBase Connected Successfully');
  })
  .catch((err) => {
    console.error('Database connection Error:', err);
    process.exit(1);
  });

const port = process.env.PORT || 3002;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! ⛔️ Shutting Down....');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
