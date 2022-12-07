import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
import { CartAction } from '../reducer/CartReducer';
import Header from '../components/header';

const Detail = () => {
	const [product, setProduct] = useState({});
	const [loading, setLoading] = useState(true);
	const { id } = useParams();
	const navigate = useNavigate();
	const {
		state: { cart },
		dispatch,
	} = useCartContext();

	useEffect(() => {
		const getDetailProduct = async () => {
			await axios
				.get(`https://fakestoreapi.com/products/${id}`)
				.then((response) => {
					setProduct(response.data);
					setLoading(false);
				});
		};

		getDetailProduct();
	}, [id]);

	const CheckProductInCart = () => {
		if (cart.some((item) => item.id === product.id)) {
			return true;
		}
		return false;
	};

	return (
		<div>
			<Header />
			<NavLink to={'/product'}>Back</NavLink>
			<button onClick={() => navigate('/cart')}>Cart</button>
			<br />
			{loading ? (
				'loading'
			) : (
				<>
					<img className='w-[300px]' src={product.image} alt='' />
					<h4>{product.title}</h4>
					<p>{product.price}</p>
					<button
						className={`${'bg-blue-500 disabled'} text-xl p-2.5 rounded-lg text-white`}
						onClick={() => {
							if (CheckProductInCart()) {
								alert('item sudah ada di cart');
								return navigate('/cart');
							} else {
								dispatch({
									type: CartAction.ADD_TO_CART,
									payload: {
										...product,
									},
								});
							}
						}}>
						add to cart
					</button>
				</>
			)}
		</div>
	);
};

export default Detail;
