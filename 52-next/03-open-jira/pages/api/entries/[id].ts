import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data =
  | { message: string }
  | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  const { id } = req.query;

  if ( !mongoose.isValidObjectId( id )) {
    res.status(400).json({ message: 'Id is not valid' + id })
  }

  switch ( req.method ) {
    case 'PUT':
      return updateEntry( req, res );

    default:
      return res.status(400).json({ message: 'Method does not exist' })
  }
}

const updateEntry = async( req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await Entry.findById( id );

  if ( !entryToUpdate ) {
    await db.disconnect();
    return res.status(400).json({ message: 'There are no entries with that id ' + id })
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  const updatedEntry = await Entry.findByIdAndUpdate( id, { description, status }, { runValidators: true, new: true });

  res.status(200).json( updatedEntry! );

}