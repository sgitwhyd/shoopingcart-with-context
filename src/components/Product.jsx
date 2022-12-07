import React from 'react';
import { NavLink } from 'react-router-dom';

const Product = (props) => {
	const slug = props.category;

	return (
		<>
			<div key={props.id} className='group relative'>
				<div className='min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md  group-hover:opacity-75 lg:aspect-none lg:h-80'>
					<img
						src={props.image}
						alt={props.title}
						className='h-full w-full object-contain object-center lg:h-full lg:w-full'
					/>
				</div>
				<div className='mt-4 flex justify-between'>
					<div>
						<h3 className='text-sm text-gray-700'>
							<NavLink to={`/product/${slug.split(' ').join('-')}/${props.id}`}>
								<span aria-hidden='true' className='absolute inset-0' />
								{props.title}
							</NavLink>
						</h3>
						<p className='mt-1 text-sm text-gray-500'>{props.rating.rate}</p>
					</div>
					<p className='text-sm font-medium text-gray-900'>{props.price}</p>
				</div>
			</div>
		</>
	);
};

export default Product;
