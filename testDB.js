// testDB.js
import { initMongoDB } from './src/db/initMongoDB.js';
import { CamperCollection } from './src/db/models/camper.js';

const test = async () => {
  await initMongoDB();

  const campers = await CamperCollection.find();
  console.log('Campers in DB:', campers.length);
  console.log(campers.map((c) => c.name));

  process.exit();
};

test();
