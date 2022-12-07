import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';

const Header = () => {
	const {
		state: { cart },
	} = useCartContext();
	const navigate = useNavigate();

	return (
		<div
			class='flex space-x-2 justify-center'
			onClick={() => navigate('/cart')}>
			<button
				type='button'
				class='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center'>
				Notifications
				<span class='inline-block py-1 px-1.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-600 text-white rounded ml-2'>
					{cart.length}
				</span>
			</button>
		</div>
	);
};

export default Header;
