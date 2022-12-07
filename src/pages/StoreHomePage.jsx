import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from '../components/Product';
import { useCartContext } from '../context/CartContext';
import { CartAction } from '../reducer/CartReducer';
import Header from '../components/header';

const StoreHomePage = () => {
	const [products, setProduct] = useState([]);
	const [error, setError] = useState({
		status: false,
		message: '',
	});
	const {
		state: { limitShowProduct },
		dispatch,
	} = useCartContext();

	useEffect(() => {
		const getProducts = async () => {
			await axios
				.get(`https://fakestoreapi.com/products?limit=${limitShowProduct}`)
				.then((response) => {
					setProduct(response.data);
				})
				.catch((error) => {
					setError({
						status: true,
						message: error.message,
					});
				});
		};
		getProducts();
	}, [limitShowProduct]);

	return (
		<>
			<Header />
			<div className='bg-white'>
				<div className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
					<h2 className='text-2xl font-bold tracking-tight text-gray-900'>
						Customers also purchased
					</h2>

					<div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
						{error.status ? (
							error.message
						) : products.length <= 0 ? (
							<div className='animate-spin text-center'>Loading</div>
						) : (
							products.map((product) => (
								<Product key={product.id} {...product} />
							))
						)}
					</div>

					<button
						className='text-sm bg-purple-600 p-2.5 rounded-md font-bold text-white'
						onClick={() => {
							dispatch({
								type: CartAction.INCREMENT_SHOW_PRODUCTS,
							});
						}}>
						Show More
					</button>
				</div>
			</div>
		</>
	);
};

export default StoreHomePage;
