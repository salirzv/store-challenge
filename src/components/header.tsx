import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../skeleton/main-layout';

export default function Header() {
	const [cartCount, setCartCount] = useState(0);
	const { user } = useContext(UserContext);
	useEffect(() => {
		if (user !== null) {
			setCartCount(user.cart.length);
		} else {
			setCartCount(0);
		}
	}, [user]);
	return (
		<>
			<header className='main-header'>
				<div className='header-container'>
					<div className='links'>
						<div className='link'>
							<Link to='/'>Home</Link>
						</div>
						<div className='link'>
							<Link to='/dashboard'>Dashboard</Link>
						</div>
						<div className='link'>
							<Link to='/dashboard'>Cart: {cartCount}</Link>
						</div>
					</div>
				</div>
			</header>
		</>
	);
}
