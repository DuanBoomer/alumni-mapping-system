import Header from '../components/Header';
import Button from '../components/Button';

import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import { useState } from 'react';

function Profile({ primaryUserData }) {
	const navigate = useNavigate();
	const dontShow = [
		'name',
		'desc',
		'image',
		'student_coordinator',
		'alumni',
		'email',
		'batch',
		'expertise',
	];
	const [logoutModal, setLogoutModal] = useState(false);

	const styles = {
		profile_div: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			padding: '1.5em',
			marginBottom: '1.5em',

			borderRadius: '18px',
			background: 'var(--main-bg-color)',
			boxShadow:
				'-8px -8px 16px 0px var(--light-shadow), 8px 8px 16px 0px var(--dark-shadow)',
		},
		profile_image: {
			height: '150px',
			width: '150px',
			objectFit: 'cover',
			borderRadius: '10px',
		},

		name: {
			margin: '0',
			color: 'var(--text-color-dark)',
			textAlign: 'center',
			fontFamily: 'Poppins',
			fontSize: 'var(--font-size-lg)',
			fontStyle: 'normal',
			fontWeight: '400',
			lineHeight: 'normal',
		},

		text: {
			margin: '0',
			color: 'var(--text-color-light)',
			textAlign: 'center',
			fontFamily: 'Poppins',
			fontSize: 'var(--font-size-sm)',
			fontStyle: 'normal',
			fontWeight: '400',
			lineHeight: 'normal',
		},
	};

	function handleClick(path) {
		navigate(path);
	}

	function handleLogout() {
		setLogoutModal(true);
		localStorage.setItem('data', JSON.stringify({ type: '', email: '' }));
		navigate('/');
	}

	return (
		<div style={{ padding: '1em 1em 3em 1em' }}>
			<Header text={'Profile'} />

			<div style={styles.profile_div}>
				<img
					style={styles.profile_image}
					src={primaryUserData.image}
					alt='profile'
				/>
				<p style={styles.name}>{primaryUserData.name}</p>

				{Object.keys(primaryUserData).map((key, index) => {
					if (dontShow.includes(key)) {
						return <></>;
					} else {
						return (
							<p
								key={index}
								style={styles.text}>
								{primaryUserData[key]}
							</p>
						);
					}
				})}
			</div>

			<div style={{ display: 'flex', flexDirection: 'column', gap: '0.75em' }}>
				<Button
					text={'Edit Profile'}
					type='light'
					size='large'
					onClick={() => handleClick('/editprofile')}
				/>
				{primaryUserData.alumni ? (
					<></>
				) : (
					<Button
						text={'Schedule Meet'}
						type='light'
						size='large'
						onClick={() => handleClick('/schedulemeet')}
					/>
				)}
				<Button
					text={'Reset Password'}
					type='light'
					size='large'
					onClick={() => handleClick('/resetpassword')}
				/>
				<Button
					text={'Log Out'}
					type='light'
					size='large'
					onClick={() => setLogoutModal(true)}
				/>
			</div>
			<Modal
				showModal={logoutModal}
				setShowModal={setLogoutModal}>
				<p>Are you sure you want to logout?</p>
				<Button
					text={'yes'}
					type={'light'}
					size={'small'}
					onClick={handleLogout}
				/>
				<Button
					text={'no'}
					type={'dark'}
					size={'small'}
					onClick={() => setLogoutModal(false)}
				/>
			</Modal>
		</div>
	);
}

export default Profile;
