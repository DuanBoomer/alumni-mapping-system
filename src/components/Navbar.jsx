import home from '../assets/home-icon.svg';
import chats from '../assets/chat-icon.svg';
import profile from '../assets/profile-icon.svg';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
	const navigate = useNavigate();
	const location = useLocation();

	const notAllowedRoutes = ['/', '/chat', '/firsttimelogin'];

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

	function handleClick(path) {
		navigate(path);
	}

	return (
		<div>
			{notAllowedRoutes.includes(location.pathname) ? (
				<></>
			) : (
				<div style={styles.div}>
					<img
						onClick={() => {
							handleClick('/home');
						}}
						src={home}
						alt=''
					/>
					<img
						onClick={() => {
							handleClick('/chat');
						}}
						src={chats}
						alt=''
					/>
					<img
						onClick={() => {
							handleClick('/profile');
						}}
						src={profile}
						alt=''
					/>
				</div>
			)}
		</div>
	);
}

export default Navbar;
