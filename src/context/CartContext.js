import React, { createContext, useContext, useReducer } from 'react';
import CartReducer from '../reducer/CartReducer';

const CartContext = createContext();

export const useCartContext = () => {
	return useContext(CartContext);
};

const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(CartReducer, {
		limitShowProduct: 4,
		cart: [],
	});

	return (
		<CartContext.Provider value={{ state, dispatch }}>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;
