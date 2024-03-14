import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ProductView from '../components/parts/product-view';
import { Product } from '../types';
import nProgress from 'nprogress';

export default function Index() {
	const [products, SetProducts] = useState<Product[]>([]);

	useEffect(() => {
		nProgress.start();
		fetch('https://fakestoreapi.com/products?limit=9')
			.then(async (res) => {
				nProgress.done();
				const results = await res.json();
				SetProducts(results);

				return () => SetProducts([]);
			})
			.catch(() => {
				nProgress.done();
				toast.error('Unable to retrieve data from API');
			});
	}, []);

	return (
		<>
			<div className='index-page'>
				<div className='product-view-container'>
					{products.length !== 0
						? products.map((e, index) => {
								return (
									<ProductView
										id={e.id}
										image={e.image}
										price={e.price}
										title={e.title}
										key={index}
									/>
								);
						  })
						: null}
				</div>
			</div>
		</>
	);
}
