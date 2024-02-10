import home from '../assets/home-icon.svg';
import chats from '../assets/chat-icon.svg';
import profile from '../assets/profile-icon.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const notAllowedRoutes = ['/', '/firsttimelogin'];

function Navbar() {
	const navigate = useNavigate();
	const location = useLocation();
	// const slider = useRef(null)

	// function changeSliderPosition(){
	// 	slider.current.bottom = '0'
	// }

	useEffect(() => {
		const menu = document.querySelector('.menu__list');
		menu?.addEventListener('mouseover', (event) => {
			if (event.target.classList.contains('menu__link')) {
				menu.style.setProperty(
					'--underline-width',
					`${event.target.offsetWidth}px`
				);
				menu.style.setProperty(
					'--underline-offset-x',
					`${event.target.offsetLeft}px`
				);
			}
		});
		// menu.addEventListener('mouseleave', () =>
		// 	menu.style.setProperty('--underline-width', '0')
		// );

		//   return () => {
		// 	second
		//   }
	}, []);

	return (
		<>
			{notAllowedRoutes.includes(location.pathname) ? null : (
				<div
					style={styles.div}
					className='menu__list'>
					<button
						className='menu__item'
						style={{ boxShadow: 'none' }}>
						<img
							className='menu__link'
							onClick={() => {
								navigate('/home');
							}}
							src={home}
							alt='home'
						/>
					</button>

					<button
						className='menu__item'
						style={{ boxShadow: 'none' }}>
						<img
							className='menu__link'
							onClick={() => {
								navigate('/chat');
							}}
							src={chats}
							alt=''
						/>
					</button>

					<button
						className='menu__item'
						style={{ boxShadow: 'none' }}>
						<img
							className='menu__link'
							onClick={() => {
								navigate('/profile');
							}}
							src={profile}
							alt='profile'
						/>
					</button>

					{/* <div
						ref={slider}
						style={styles.slider}></div> */}
				</div>
			)}
		</>
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

	slider: {
		position: 'absolute',
		left: '0',
		// bottom: '0',
		width: '25px',
		height: '10px',
		background: 'green',
	},
};
