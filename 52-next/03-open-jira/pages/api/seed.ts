import type { NextApiRequest, NextApiResponse } from 'next';
import { db, seedData } from '../../database';
import { Entry } from '../../models';

type Data = {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  if ( process.env.NODE_ENV === 'production' ) {
    res.status(401).json({ message: 'You do not have access to this service' })
  }

  await db.connect();
  await Entry.deleteMany();
  await Entry.insertMany( seedData.entries );

  await db.disconnect();

  res.status(200).json({ message: 'Process done correctly'});
}