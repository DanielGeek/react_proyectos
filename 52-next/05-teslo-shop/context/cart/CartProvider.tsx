import React, { useReducer } from 'react';
import { ICartProduct } from '../../interfaces';
import { CartContext, cartReducer } from './';

interface Props {
    children?: React.ReactNode;
}
export interface CartState {
    cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
    cart: [],
}

export const CartProvider:React.FC<Props> = ({ children }) => {

 const [state, dispatch] = useReducer( cartReducer, CART_INITIAL_STATE );

 const addProductToCart = ( product: ICartProduct ) => {
  //! Level 1
  // dispatch({ type: '[Cart] - Add Product', payload: product });

  //! Level 2
  // const productsInCart = state.cart.filter( p => p._id !== product._id && p.size !== product.size );
  // dispatch({ type: '[Cart] - Add Product', payload: [...productsInCart, product] });

  //! Level 3
  const productInCart = state.cart.some( p => p._id === product._id );
  if ( !productInCart ) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product ] });

  const productInCartButDifferentSize = state.cart.some( p => p._id === product._id && p.size === product.size );
  if ( !productInCartButDifferentSize ) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product ] });

  // Accumulate
  const updatedProducts = state.cart.map( p => {
      if ( p._id !== product._id ) return p;
      if ( p.size !== product.size ) return p;

      // update quantity
      p.quantity += product.quantity;
      return p;
  });

  dispatch({ type: '[Cart] - Update products in cart', payload: updatedProducts });

 }

 return (
   <CartContext.Provider value={{
       ...state,

       // Methods
       addProductToCart,
   }}>
     { children }
   </CartContext.Provider>
 )
}