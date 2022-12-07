export const CartAction = {
	ADD_TO_CART: 'ADD_TO_CART',
	REMOVE_FROM_CART: 'REMOVE_FROM_CART',
	INCREMENT_SHOW_PRODUCTS: 'INCREMENT_SHOW_PRODUCTS',
	INCREMENT_QTY_PRODUCT: 'INCREMENT_QTY_PRODUCT',
	DECREMENT_QTY_PRODUCT: 'DECREMENT_QTY_PRODUCT',
};

const CartReducer = (state, action) => {
	switch (action.type) {
		case CartAction.ADD_TO_CART:
			return {
				...state,
				cart: [...state.cart, { ...action.payload, qty: 1 }],
			};
		case CartAction.REMOVE_FROM_CART:
			return {
				...state,
				cart: state.cart.filter((item) => item.id !== action.payload.id),
			};
		case CartAction.INCREMENT_SHOW_PRODUCTS:
			if (state.limitShowProduct > 20) {
				return {
					...state,
					limitShowProduct: 20,
				};
			} else {
				return {
					...state,
					limitShowProduct: state.limitShowProduct + 4,
				};
			}
		case CartAction.INCREMENT_QTY_PRODUCT:
			return {
				...state,
				cart: state.cart.filter((item) =>
					item.id === action.payload.id
						? (item.qty = action.payload.qty + 1)
						: item.qty
				),
			};
		case CartAction.DECREMENT_QTY_PRODUCT:
			return {
				...state,
				cart: state.cart.filter((item) =>
					item.id === action.payload.id
						? item.qty > 1
							? (item.qty = action.payload.qty - 1)
							: (item.qty = 1)
						: item.qty
				),
			};
		default:
			return state;
	}
};

export default CartReducer;
