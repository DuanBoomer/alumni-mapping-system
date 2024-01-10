export default function Loading({ show }) {
	const styles = {
		screen: {
			backgroundColor: 'var(--main-bg-color)',
			height: '100vh',
			width: '100vw',
			position: 'fixed',
			top: '0',
		},
	};
	return (
		<div>
			{show ? (
				<div style={styles.screen}>
					<p style={{ margin: 0 }}>Loading</p>
				</div>
			) : (
				<></>
			)}
		</div>
	);
}
