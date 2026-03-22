const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding...');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();

    const adminExists = await User.findOne({ mobile: '9999999999' });

    if (adminExists) {
      console.log('Admin user already exists!');
      process.exit();
    }

    const adminUser = {
      name: 'Super Admin',
      age: 30,
      gender: 'male',
      city: 'System',
      occupation: 'Administrator',
      mobile: '9999999999',
      password: 'admin123',
      role: 'admin'
    };

    await User.create(adminUser);

    console.log('Admin User Created Successfully!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
