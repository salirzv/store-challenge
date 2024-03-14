import { useContext, useEffect, useState } from 'react';
import { UserLoginData, UserRegisterData } from '../types';
import nProgress from 'nprogress';
import { toast } from 'react-toastify';
import { UserContext } from '../skeleton/main-layout';
import { useNavigate } from 'react-router-dom';
import { string, number, object, ValidationError } from 'yup';

export default function Auth() {
	const navigate = useNavigate();
	const { user, setUser } = useContext(UserContext);

	useEffect(() => {
		if (user !== null) {
			navigate('/dashboard');
		}
	}, [user, navigate]);

	const [loginData, setLoginData] = useState<UserLoginData>({
		username: 'mor_2314',
		password: '83r5^_',
	});

	const [registerData, setRegisterData] = useState<UserRegisterData>({
		email: 'John@gmail.com',
		username: 'johnd',
		password: 'm38rmF$',
		name: {
			firstName: 'John',
			lastName: 'Doe',
		},
		address: {
			city: 'kilcoole',
			street: '7835 new road',
			number: 3,
			zipCode: '12926-3874',
		},
		phone: '1-570-236-7033',
	});

	const handleLogin = () => {
		nProgress.start();
		fetch('https://fakestoreapi.com/auth/login', {
			method: 'POST',
			headers: [['Content-type', 'application/json']],
			body: JSON.stringify(loginData),
		})
			.then(async (res) => {
				nProgress.done();
				if (res.ok) {
					toast.success('Logged in successfully');
					const res_data = await res.json();
					//assume user id is 1, login resonse does not give any information
					let userCart = [];
					nProgress.start();
					try {
						//auth does not give the user cart, retrive it with an other request
						//In real life examples this request should require authentication
						const cartResponse = await fetch(
							'https://fakestoreapi.com/carts/user/1'
						);
						if (cartResponse.ok) {
							nProgress.done();
							const res = await cartResponse.json();
							//only use the first cart of the array
							userCart = res[0].products.map(
								(e: { productId: number }) => {
									return e.productId;
								}
							);
							setUser({
								id: 1,
								token: res_data.token,
								cart: userCart,
							});
						} else {
							nProgress.done();
							toast.error(
								'Could not connect to the cart api server'
							);
						}
					} catch (e) {
						nProgress.done();

						toast.error('Could not connect to the cart api server');
					}
				} else {
					nProgress.done();
					toast.error('Username or password is wrong');
				}
			})
			.catch(() => {
				nProgress.done();
				toast.error(
					'Could not connect to the api server, check your internet connection'
				);
			});
	};

	const handleRegister = async () => {
		//no data will be sent to the server, just a local data validation
		const registerUserSchema = object<UserRegisterData>({
			email: string().required().email(),
			username: string().required(),
			password: string().required(),
			name: object({
				firstName: string().required(),
				lastName: string().required(),
			}),
			address: object({
				city: string().required(),
				street: string().required(),
				number: number().required().positive(),
				zipCode: string().required(),
			}),
			phone: string().required(),
		});

		try {
			await registerUserSchema.validate(registerData);
			toast.success('Form data is valid');
		} catch (e) {
			const tmp = e as ValidationError;
			toast.error(tmp.errors[0]);
		}
	};
	return (
		<>
			<div className='auth-container'>
				<div className='login'>
					<div className='title'>Log in</div>
					<label>Username</label>
					<input
						value={loginData.username}
						type='text'
						name='username'
						autoComplete='username'
						onChange={(e) => {
							setLoginData({
								...loginData,
								username: e.target.value,
							});
						}}
					/>
					<label>Password</label>
					<input
						value={loginData.password}
						type='password'
						autoComplete='current-password'
						onChange={(e) => {
							setLoginData({
								...loginData,
								password: e.target.value,
							});
						}}
					/>
					<button onClick={handleLogin}>Log In</button>
				</div>
				<div className='register'>
					<div className='title'>Register</div>
					<code>
						The submitted data is truly a mock up and will not
						change any thing, log in with the already filled inputs
					</code>
					<code>
						But the form will be validated locally, for example
						enter some invalid data for email and it will be
						examined
					</code>
					<label>Email</label>
					<input
						value={registerData.email}
						type='text'
						name='email'
						onChange={(e) => {
							setRegisterData({
								...registerData,
								email: e.target.value,
							});
						}}
					/>
					<label>Username</label>
					<input
						value={registerData.username}
						type='text'
						name='username'
						onChange={(e) => {
							setRegisterData({
								...registerData,
								username: e.target.value,
							});
						}}
					/>
					<label>Password</label>
					<input
						value={registerData.password}
						type='password'
						name='password'
						onChange={(e) => {
							setRegisterData({
								...registerData,
								password: e.target.value,
							});
						}}
					/>
					<label>First name</label>
					<input
						value={registerData.name.firstName}
						type='text'
						onChange={(e) => {
							setRegisterData({
								...registerData,
								name: {
									...registerData.name,
									firstName: e.target.value,
								},
							});
						}}
					/>
					<label>Last name</label>
					<input
						value={registerData.name.lastName}
						type='text'
						onChange={(e) => {
							setRegisterData({
								...registerData,
								name: {
									...registerData.name,
									lastName: e.target.value,
								},
							});
						}}
					/>
					<label>City</label>
					<input
						value={registerData.address.city}
						type='text'
						onChange={(e) => {
							setRegisterData({
								...registerData,
								address: {
									...registerData.address,
									city: e.target.value,
								},
							});
						}}
					/>
					<label>Street</label>
					<input
						value={registerData.address.street}
						type='text'
						onChange={(e) => {
							setRegisterData({
								...registerData,
								address: {
									...registerData.address,
									street: e.target.value,
								},
							});
						}}
					/>
					<label>St. Number</label>
					<input
						value={registerData.address.number}
						type='number'
						onChange={(e) => {
							setRegisterData({
								...registerData,
								address: {
									...registerData.address,
									number: Number(e.target.value),
								},
							});
						}}
					/>
					<label>Zip code</label>
					<input
						value={registerData.address.zipCode}
						type='text'
						onChange={(e) => {
							setRegisterData({
								...registerData,
								address: {
									...registerData.address,
									zipCode: e.target.value,
								},
							});
						}}
					/>
					<label>Phone</label>
					<input
						value={registerData.phone}
						type='text'
						name='phone'
						onChange={(e) => {
							setRegisterData({
								...registerData,
								phone: e.target.value,
							});
						}}
					/>

					<button onClick={handleRegister}>Register</button>
				</div>
			</div>
		</>
	);
}
