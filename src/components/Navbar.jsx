import home from '../assets/home-icon.svg';
import chats from '../assets/chat-icon.svg';
import profile from '../assets/profile-icon.svg';
import { useNavigate, useLocation } from 'react-router-dom';

const notAllowedRoutes = ['/', '/chat', '/firsttimelogin'];

function Navbar() {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<div>
			{notAllowedRoutes.includes(location.pathname) ? null : (
				<div style={styles.div}>
					<img
						onClick={() => {
							navigate('/home');
						}}
						src={home}
						alt='home'
					/>
					<img
						onClick={() => {
							navigate('/chat');
						}}
						src={chats}
						alt=''
					/>
					<img
						onClick={() => {
							navigate('/profile');
						}}
						src={profile}
						alt='profile'
					/>
				</div>
			)}
		</div>
	);
}

export default Navbar;

const styles = {
	div: {
		display: 'flex',
		padding: '0.5em',
		justifyContent: 'space-evenly',
		borderRadius: '15px',
		background: 'var(--main-bg-color)',
		boxShadow:
			'5px 5px 10px 0px var(--dark-shadow), -5px -5px 10px 0px var(--light-shadow)',

		position: 'fixed',
		bottom: '1em',
		left: '1em',
		right: '1em',
	},
};
