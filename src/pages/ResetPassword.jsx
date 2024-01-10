import Header from '../components/Header';
import InputField from '../components/InputField';
import Button from '../components/Button';
import axios from 'axios';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../App';
import { useState } from 'react';
export default function ResetPassword({ primaryUserData }) {
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();

	function handleResetPassword() {
		if (newPassword === confirmPassword) {
			axios
				.put(`${API_BASE}/set/password/${primaryUserData.email}`, {
					password: confirmPassword,
					type: primaryUserData.alumni ? 'student' : 'alumni',
				})
				.then((response) => {
					if (response.data.success) {
						// console.log('password reset');
						setError(false);
						setShowModal(false);
						navigate('/profile');
					} else {
						// console.log('password not reset');
						setError(true);
						setShowModal(false);
					}
				});
		} else {
			setError(true);
			setShowModal(false);
		}
	}
	return (
		<div style={{ padding: '1em 1em 3em 1em' }}>
			<Header text={'Reset Password'} />

			<InputField
				title={'New Password'}
				placeholder={'something secret'}
				type={'password'}
				state={newPassword}
				setState={setNewPassword}
			/>
			<InputField
				title={'Confirm Password'}
				placeholder={'something secret'}
				type={'password'}
				state={confirmPassword}
				setState={setConfirmPassword}
			/>
			{error ? (
				<p style={{ margin: '0 0 1em 0', color: 'red' }}>
					something went wrong
				</p>
			) : (
				<></>
			)}

			<Button
				text={'Reset'}
				type={'light'}
				size={'big'}
				onClick={() => setShowModal(true)}
			/>

			<Modal
				showModal={showModal}
				setShowModal={setShowModal}>
				<p>Are you sure you want to reset your password?</p>
				<Button
					text={'yes'}
					type={'light'}
					size={'small'}
					onClick={handleResetPassword}
				/>
				<Button
					text={'no'}
					type={'dark'}
					size={'small'}
					onClick={() => setShowModal(false)}
				/>
			</Modal>
		</div>
	);
}
