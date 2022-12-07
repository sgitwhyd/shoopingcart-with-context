import { useEffect, useState } from 'react';
import { useCartContext } from '../context/CartContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { CartAction } from '../reducer/CartReducer';

const Cart = () => {
	const navigate = useNavigate();
	const [inCart, setInCart] = useState([]);
	const [subTotal, setSubTotal] = useState();
	const {
		state: { cart },
		dispatch,
	} = useCartContext();

	useEffect(() => {
		setSubTotal(
			cart.reduce(
				(inCart, current) => inCart + Number(current.price) * current.qty,
				0
			)
		);

		setInCart(cart);
	}, [cart]);

	return (
		<>
			<button className='bg-gray-500 text-xl' onClick={() => navigate(-1)}>
				Back
			</button>
			<div className='mt-8'>
				<div className='container mx-auto'>
					{cart.length === 0 ? (
						'no item'
					) : (
						<>
							<ul className='-my-6 divide-y divide-gray-200'>
								{inCart.map((product) => (
									<li key={product.id} className='flex py-6'>
										<div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
											<img
												src={product.image}
												alt={product.imageAlt}
												className='h-full w-full object-cover object-center'
											/>
										</div>

										<div className='ml-4 flex flex-1 flex-col'>
											<div>
												<div className='flex justify-between text-base font-medium text-gray-900'>
													<h3>
														<NavLink
															to={`/product/${product.category
																.split(' ')
																.join('-')}/${product.id}`}>
															{product.title}
														</NavLink>
													</h3>
													<p className='ml-4'>{product.price * product.qty}</p>
												</div>
											</div>
											<div className='flex flex-1 items-end justify-between text-sm'>
												<p className='text-gray-500'>Qty {product.qty}</p>
												<button
													className='p-1 bg-red-500'
													onClick={() => {
														dispatch({
															type: CartAction.DECREMENT_QTY_PRODUCT,
															payload: {
																id: product.id,
																qty: product.qty,
															},
														});
													}}>
													-
												</button>
												<button
													className='p-1 bg-blue-400'
													onClick={() => {
														dispatch({
															type: CartAction.INCREMENT_QTY_PRODUCT,
															payload: {
																id: product.id,
																qty: product.qty,
															},
														});
													}}>
													+
												</button>
												<div className='flex'>
													<button
														type='button'
														className='font-medium text-indigo-600 hover:text-indigo-500'
														onClick={() => {
															dispatch({
																type: CartAction.REMOVE_FROM_CART,
																payload: {
																	id: product.id,
																},
															});
														}}>
														Remove
													</button>
												</div>
											</div>
										</div>
									</li>
								))}
							</ul>
							<div className='border-t border-gray-200 py-6 px-4 sm:px-6'>
								<div className='flex justify-between text-base font-medium text-gray-900'>
									<p>Subtotal</p>
									<p>{subTotal}</p>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default Cart;
