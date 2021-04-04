import faker from 'faker';

import User from '../models/user.js';

const seedDb = async () => {
  console.log('Seeding database...');

  if ((await User.countDocuments({ role: 'ADMIN' })) === 0) {
    const adminUser = await User({
      email: `admin@email.com`,
      password: '123456',
      name: faker.name.findName(),
      role: 'ADMIN',
    }).save();
  }

  if ((await User.countDocuments({ role: 'USER' })) === 0) {
    // create 3 users
    for (let index = 0; index < 3; index++) {
      const user = await User({
        email: `user${index}@email.com`,
        password: '123456',
        name: faker.name.findName(),
        role: 'USER',
      }).save();
    }
  }
};

export default seedDb;
