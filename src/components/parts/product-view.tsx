import { useContext } from 'react';
import { Product } from '../../types';
import { UserContext } from '../../skeleton/main-layout';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function ProductView(props: Product) {
	const { user, setUser } = useContext(UserContext);
	const navigate = useNavigate();

	const removeFromCart = (id: number) => {
		//should never be null, but does not hurt to check!
		if (user !== null) {
			if (user.cart.includes(id)) {
				setUser((old) => {
					const pre = old!;
					return { ...pre, cart: pre.cart.filter((e) => e !== id) };
				});
				toast.warn('Item removed from cart');
			}
		}
	};

	const addToCart = (id: number) => {
		if (user !== null) {
			if (!user.cart.includes(id)) {
				setUser((old) => {
					const pre = old!;
					const tmpCart = pre.cart;
					tmpCart.push(id);
					return { ...pre, cart: tmpCart };
				});
				toast.success(
					'Item added to cart, go to your dashboard to view it'
				);
			}
		} else {
			//user not logged in
			toast.warn('You must log in to add items to your cart');
			navigate('/auth');
		}
	};

	return (
		<>
			<div className='single-product'>
				<div className='p-image'>
					<img src={props.image} alt='' />
				</div>
				<div className='p-title'>{props.title}</div>
				<div className='p-actions'>
					<div className='p-price'>{props.price} $</div>
					<div className='p-cart-action'>
						{props.action === 'remove' ? (
							<div
								onClick={() => removeFromCart(props.id)}
								style={{ color: 'red' }}
							>
								Remove from cart
							</div>
						) : user?.cart.includes(props.id) ? (
							<div
								style={{ color: 'red', cursor: 'not-allowed' }}
							>
								In cart
							</div>
						) : (
							<div
								onClick={() => {
									addToCart(props.id);
								}}
							>
								Add To Cart
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
