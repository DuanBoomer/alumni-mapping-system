import logo from '../assets/logo.svg';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header({ text }) {
	var navigate = useNavigate();
	var location = useLocation();

	return (
		<div style={styles.div}>
			<h1 style={styles.h1}>{text}</h1>
			<div
				style={styles.img_div}
				onClick={() =>
					notAllowedRoutes.includes(location.pathname) ? {} : navigate('/home')
				}>
				<img
					style={styles.img}
					src={logo}
					alt='college logo'
				/>
			</div>
		</div>
	);
}

const notAllowedRoutes = ['/', '/firsttimelogin'];
const styles = {
	h1: {
		color: 'var(--text-color-dark)',
		fontFamily: 'Poppins',
		fontSize: 'clamp(2rem, 8vw + 1rem, 6rem)',
		fontWeight: 400,
		lineHeight: '42px',
		margin: '0',
		width: '60%',
	},

	img: {
		width: '60px',
	},

	div: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: '1em',
	},

	img_div: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '75px',
		height: '75px',
		borderRadius: '100px',
		boxShadow:
			'2px 2px 4px 0px var(--dark-shadow) inset, -2px -2px 4px 0px var(--light-shadow) inset',
	},
};
