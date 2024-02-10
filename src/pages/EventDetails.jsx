import Button from '../components/Button';
import Header from '../components/Header';
import EventDetailsFlat from '../components/EventDetailsFlat';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from '../components/Modal';
import { useCallback, useContext, useState } from 'react';
import { API_BASE } from '../App';
import { DataContext } from '../App';

export default function EventDetails() {
	const location = useLocation();
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);
	const [showMarkModal, setShowMarkModal] = useState(false);

	const eventData = location.state.eventData;
	const { alumniData } = useContext(DataContext);
	const primaryUserData = JSON.parse(
		window.localStorage.getItem('PrimaryUserData')
	);

	function handleCancelClick() {
		axios
			.delete(`${API_BASE}/delete/event/${alumniData.email}/${eventData.title}`)
			.then((response) => {
				setShowModal(false);
				navigate('/home');
			})
			.catch((error) => {});
	}

	function handleMarkAsDoneClick() {
		axios
			.put(`${API_BASE}/update/event/${alumniData.email}/${eventData.title}`, {
				...eventData,
				type: 'done',
			})
			.then((response) => {
				setShowMarkModal(false)
				navigate('/home');
			})
			.catch((error) => {});
	}

	function handleEditClick() {
		navigate('/schedulemeet', { state: eventData });
	}

	return (
		<>
			<Header text={'Event Details'} />
			<EventDetailsFlat eventData={eventData} />

			<div style={{ display: 'flex', flexDirection: 'column' }}>
				{primaryUserData.alumni ? null : (
					<div>
						<Button
							text={'Cancel'}
							type={'dark'}
							size={'big'}
							onClick={() => setShowModal(true)}
						/>
						<Button
							text={'Edit'}
							type={'dark'}
							size={'big'}
							onClick={handleEditClick}
						/>
						<Button
							text={'Mark as done'}
							type={'dark'}
							size={'big'}
							onClick={() => setShowMarkModal(true)}
						/>
					</div>
				)}
			</div>

			<Modal
				showModal={showModal}
				setShowModal={setShowModal}>
				<p>Are you sure you want to cancel this meeting?</p>
				<Button
					text={'yes'}
					type={'light'}
					size={'small'}
					onClick={handleCancelClick}
				/>
				<Button
					text={'no'}
					type={'dark'}
					size={'small'}
					onClick={() => setShowModal(false)}
				/>
			</Modal>

			<Modal
				showModal={showMarkModal}
				setShowModal={setShowMarkModal}>
				<p>Are you sure you want to mark this meeting as done?</p>
				<Button
					text={'yes'}
					type={'light'}
					size={'small'}
					onClick={handleMarkAsDoneClick}
				/>
				<Button
					text={'no'}
					type={'dark'}
					size={'small'}
					onClick={() => setShowMarkModal(false)}
				/>
			</Modal>
		</>
	);
}
