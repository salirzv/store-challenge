export default function ErrorPage() {
	return (
		<>
			<div
				style={{
					height: '100vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
				}}
			>
				<div
					style={{
						fontSize: '1.2rem',
						fontWeight: '600',
						marginBottom: '15px',
					}}
				>
					Oops! You should not be here
				</div>
				<div>
					<a href='/'>Go to home</a>
				</div>
			</div>
		</>
	);
}
