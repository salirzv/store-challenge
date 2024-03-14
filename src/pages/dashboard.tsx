import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../skeleton/main-layout';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { toast } from 'react-toastify';
import ProductView from '../components/parts/product-view';
import { ScaleLoader } from 'react-spinners';

export default function Dashboard() {
	const { user, setUser } = useContext(UserContext);
	const [cartProducts, setCartProducts] = useState<Product[]>([]);
	//Usage: to show a place holder until cart is loaded
	const [cartLoadDone, setCartLoadDone] = useState(false);
	const navigate = useNavigate();

	const handleLogOut = () => {
		toast.warning('Logged out successfully');
		setUser(null);
	};

	useEffect(() => {
		if (user === null) {
			navigate('/auth');
		}
	}, [user, navigate]);

	useEffect(() => {
		if (user !== null) {
			setCartProducts([]);
			if (user.cart.length !== 0) {
				(async () => {
					for (const e of user.cart) {
						//check if item is already in cart or not, react double renders in strict mode
						try {
							const res = await fetch(
								'https://fakestoreapi.com/products/' + e
							);
							if (res.ok) {
								const data = await res.json();
								setCartProducts((old) => {
									if (
										old.every((element) => {
											return element.id !== e;
										})
									) {
										return [...old, data];
									} else {
										return old;
									}
								});
							}
						} catch (_) {
							toast.error(
								'Could not get cart items from API server, check your internet connection'
							);
						}
					}
				})();
			}
		}
	}, [user]);

	//check if all items are loaded
	useEffect(() => {
		if (user !== null) {
			if (cartProducts.length === user.cart.length) {
				setCartLoadDone(true);
			} else {
				setCartLoadDone(false);
			}
		}
	}, [user, cartProducts]);

	return (
		<>
			<div className='dashboard-container'>
				<div className='d-side-bar'>
					<div className='item' onClick={handleLogOut}>
						Logout
					</div>
				</div>
				<div className='cart-items'>
					<div className='title'>Cart Items</div>
					<div className='cart-view'>
						{cartLoadDone ? (
							cartProducts.length !== 0 ? (
								cartProducts.map((e, index) => {
									return (
										<ProductView
											key={index}
											action='remove'
											id={e.id}
											image={e.image}
											price={e.price}
											title={e.title}
										/>
									);
								})
							) : (
								<div className='cart-empty'>Cart is empty!</div>
							)
						) : (
							<ScaleLoader
								color='#004ab1'
								height={35}
								width={9}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
