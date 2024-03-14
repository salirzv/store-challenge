import { Dispatch, SetStateAction } from 'react';

export interface Product {
	id: number;
	title: string;
	price: number;
	image: string;
	//if passed, Add to cart will be changed to remove from cart
	action?: 'remove';
}

export interface User {
	id: number;
	token: string;
	cart: number[];
}

export interface UserContextType {
	user: User | null;
	setUser: Dispatch<SetStateAction<User | null>>;
}

export interface UserLoginData {
	username: string;
	password: string;
}

export interface UserRegisterData {
	email: string;
	username: string;
	password: string;
	name: {
		firstName: string;
		lastName: string;
	};
	address: {
		city: string;
		street: string;
		number: number;
		zipCode: string;
	};
	phone: string;
}
