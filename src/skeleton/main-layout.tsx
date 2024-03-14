import { ToastContainer } from 'react-toastify';
import Footer from '../components/footer';
import Header from '../components/header';
import MainPart from '../components/main-part';
import { Outlet } from 'react-router-dom';
import { createContext, useState } from 'react';
import { User, UserContextType } from '../types';

export const UserContext = createContext<UserContextType>({
	user: null,
	setUser: () => {},
});

export default function MainLayOut() {
	const [user, setUser] = useState<User | null>(null);

	return (
		<>
			<UserContext.Provider value={{ user, setUser }}>
				<div className='main-container'>
					<Header />
					<div className='main-part'>
						<MainPart>
							<Outlet />
						</MainPart>
					</div>
					<Footer />
					<ToastContainer limit={3} position='top-right' />
				</div>
			</UserContext.Provider>
		</>
	);
}
