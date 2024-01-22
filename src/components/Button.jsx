import { Link } from 'react-router-dom';

export default function Button({ text, type, size, path, onClick, action, disabled }) {
	const styles = {
		button: {
			width: 'fit-content',
			border: 'none',
			textAlign: 'center',
			fontFamily: 'Poppins',
			fontWeight: '400',
			borderRadius: '9px',
			margin: '0.3em',
			padding: size === 'big' ? '0.5rem 3rem' : '0.25rem 1.5rem',
			fontSize: size === 'big' ? 'var(--font-size-md)' : 'var(--font-size-sm)',
			color:
				type === 'light' ? 'var(--text-color-dark)' : 'var(--main-bg-color)',
			background:
				type === 'light' ? 'var(--main-bg-color)' : 'var(--text-color-dark)',
			boxShadow:
				type === 'light'
					? '4px 4px 8px 0px var(--dark-shadow), -4px -4px 8px 0px var(--light-shadow)'
					: '5px 5px 5px 0px #161513 inset, -5px -5px 5px 0px #58554B inset',
		},
	};

	return (
		<>
			{onClick ? (
				<button
					disabled={disabled}
					style={styles.button}
					type={action ? action : 'button'}
					onClick={() => onClick()}>
					{text}
				</button>
			) : (
				<Link
					to={path}
					style={{ textDecoration: 'none' }}>
					<button
						disabled={disabled}
						style={styles.button}
						type={action ? action : 'button'}>
						{text}
					</button>
				</Link>
			)}
		</>
	);
}
