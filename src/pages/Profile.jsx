import Header from '../components/Header';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import { useCallback, useState } from 'react';
// import { DataContext } from '../App';

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

function Profile() {
	const navigate = useNavigate();
	const primaryUserData = JSON.parse(
		window.localStorage.getItem('PrimaryUserData')
	);
	const [logoutModal, setLogoutModal] = useState(false);

	function handleLogout() {
		setLogoutModal(false);
		navigate('/logout');
	}

	// console.log(primaryUserData);

	return (
		<>
			<Header text={'Profile'} />

			{/* profile details (image, name, etc...) */}
			<div style={styles.profile_div}>
				<img
					style={styles.profile_image}
					src={primaryUserData.image}
					alt='profile'
				/>
				<p style={styles.name}>{primaryUserData.name}</p>

				{Object.keys(primaryUserData).map((key, index) => {
					if (dontShow.includes(key)) {
						return null;
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

			{/* menu below the user details */}
			<div style={{ display: 'flex', flexDirection: 'column', gap: '0.75em' }}>
				<Button
					text={'Edit Profile'}
					type='light'
					size='large'
					onClick={() => navigate('/editprofile')}
				/>

				{primaryUserData.alumni ? null : (
					<Button
						text={'Schedule Meet'}
						type='light'
						size='large'
						onClick={() => navigate('/schedulemeet')}
					/>
				)}

				<Button
					text={'Reset Password'}
					type='light'
					size='large'
					onClick={() => navigate('/resetpassword')}
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
		</>
	);
}

export default Profile;

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
