import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';
import type { Quote } from '../server/types';

dotenv.config();

async function run() {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    `mongodb+srv://coderaiders5:${process.env.MA_PASSWORD}@coderaiders.9tgceeu.mongodb.net/test`,
  );
  await client.connect().then(() => console.log("MongoDB connected")).catch((err) => console.log(err));
  const db: mongoDB.Db = client.db('CodeRaiders');
  const col = db.collection<Quote>('reviews');
  await col.find({}).toArray();
  await client.close();
}

const client: mongoDB.MongoClient = new mongoDB.MongoClient(
  `mongodb+srv://coderaiders5:${process.env.MA_PASSWORD}@coderaiders.9tgceeu.mongodb.net/test`,
);

export { run, client };