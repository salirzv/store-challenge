import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/index.scss';
import 'react-toastify/dist/ReactToastify.min.css';
import 'nprogress/nprogress.css';
import MainLayOut from './skeleton/main-layout.tsx';
import Index from './pages/index.tsx';
import Dashboard from './pages/dashboard.tsx';
import Auth from './pages/auth.tsx';
import ErrorPage from './error-page.tsx';

const router = createBrowserRouter([
	{
		element: <MainLayOut />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <Index />,
			},
			{
				path: '/dashboard',
				element: <Dashboard />,
			},
			{
				path: '/auth',
				element: <Auth />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
