const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const access = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB Connected `.blue + access.connection.host);
  } catch (err) {
    console.log(err.message.red.bold);
  }
};

module.exports = connectDB;
