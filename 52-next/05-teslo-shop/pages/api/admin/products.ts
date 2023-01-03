import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidObjectId } from 'mongoose';

import { IProduct } from '../../../interfaces';
import { db } from '../../../database';
import { Product } from '../../../models';

type Data = 
| { message: string }
| IProduct[]
| IProduct;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch ( req.method ) {
        case 'GET':
            return getProducts(req, res);
        
        case 'PUT':
            return updateProduct(req, res);

        case 'POST':

        default:
            res.status(200).json({ message: 'Bad request' });
    }

}

const getProducts = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    await db.connect();

    const products = await Product.find()
        .sort({ title: 'asc' })
        .lean();

    await db.disconnect();

    res.status(200).json( products );
}


const updateProduct = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { _id = '', images = [] } = req.body as IProduct;

    if ( !isValidObjectId( _id ) ) {
        return res.status(400).json({ message: 'ID of product is not valid' });
    }

    if ( images.length < 2 ) {
        return res.status(400).json({ message: 'You need at least 2 images' });
    }

    try {
        
        await db.connect();
        const product = await Product.findById(_id);
        if ( !product ) {
            await db.disconnect();
            return res.status(400).json({ message: 'There is no product with that ID' });
        }

        await product.update( req.body );
        await db.disconnect();

        return res.status(200).json( product );

    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Check the server console' });
    }
}
