import Header from '../components/Header';
import InputField from '../components/InputField';
import OutputField from '../components/OutputField';
import Button from '../components/Button';
import { useState, useContext, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_BASE } from '../App';
import { DataContext } from '../App';
import Modal from '../components/Modal';
import { BouncyBallsLoader } from 'react-loaders-kit';

export default function ScheduleMeet() {
	const navigate = useNavigate();
	const location = useLocation();
	const eventData = location.state;
	const { alumniData } = useContext(DataContext);

	const [startTime, setStartTime] = useState(
		eventData ? eventData.start_time : ''
	);
	const [endTime, setEndTime] = useState(eventData ? eventData.end_time : '');
	const [title, setTitle] = useState(eventData ? eventData.title : '');
	const [desc, setDesc] = useState(eventData ? eventData.desc : '');
	const [date, setDate] = useState(eventData ? eventData.date : '');
	const [link, setLink] = useState(eventData ? eventData.link : '');

	const [modal, setModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const loaderProps = {
		loading: loading,
		size: 40,
		duration: 0.4,
		colors: [
			'var(--text-color-dark)',
			'var(--text-color-dark)',
			'var(--text-color-dark)',
		],
	};

	const day_of_week = useCallback((date) => {
		var weekday = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		];
		var date = new Date(date);
		return weekday[date.getUTCDay()];
	}, []);

	function handleSubmitClick() {
		setLoading(true);
		if (eventData) {
			axios
				.put(
					`${API_BASE}/update/event/${alumniData.email}/${eventData.title}`,
					{
						title: title,
						start_time: startTime,
						end_time: endTime,
						day: day_of_week(date),
						date: date,
						desc: desc,
						link: link,
						talking_points: "",
						type: 'pending',
						docs: ['sample_document.pdf'],
					}
				)
				.then((response) => {
					setLoading(false);
					setModal(false);
					navigate('/home');
				})
				.catch((error) => {
					setModal(false);
					setLoading(false);
				});
		} else {
			axios
				.post(`${API_BASE}/schedule/event/${alumniData.email}`, {
					title: title,
					start_time: startTime,
					end_time: endTime,
					day: day_of_week(date),
					date: date,
					desc: desc,
					link: link,
					talking_points: "",
					type: 'pending',
					docs: ['sample_document.pdf'],
				})
				.then((response) => {
					setLoading(false);
					setModal(false);
					navigate('/home');
				})
				.catch((error) => {});
		}
	}

	const get_meet_link = useCallback(() => {
		window.open('https://meet.google.com/');
	}, []);

	return (
		<>
			<Header text={'Schedule Meet'} />
			<InputField
				title={'Title'}
				placeholder={'enter a title'}
				type={'text'}
				state={title}
				setState={setTitle}
			/>
			<InputField
				title={'Description'}
				placeholder={'enter a desc'}
				type={'textarea'}
				state={desc}
				setState={setDesc}
			/>
			<InputField
				title={'Start Time'}
				placeholder={'start time'}
				type={'time'}
				state={startTime}
				setState={setStartTime}
			/>
			<InputField
				title={'End Time'}
				placeholder={'end time'}
				type={'time'}
				state={endTime}
				setState={setEndTime}
			/>
			<InputField
				title={'Date'}
				placeholder={'date'}
				type={'date'}
				state={date}
				setState={setDate}
			/>

			<OutputField
				title={'Day'}
				text={day_of_week(date) ? day_of_week(date) : 'choose a date'}
			/>
			<InputField
				title={'Link'}
				placeholder={'meet link'}
				type={'url'}
				state={link}
				setState={setLink}
				button={
					<Button
						text={'get link'}
						type={'dark'}
						size={'small'}
						onClick={get_meet_link}
					/>
				}
			/>

			<Button
				text={'Schedule'}
				type={'light'}
				size={'big'}
				onClick={() => {
					setModal(true);
					console.log('clicked');
				}}
			/>
			<Modal
				showModal={modal}
				setShowModal={setModal}>
				<p>Do you want to schedule this meet?</p>
				<div style={{ display: 'flex' }}>
					<Button
						text={'yes'}
						type={'light'}
						action={'submit'}
						size={'small'}
						onClick={handleSubmitClick}
					/>
					<BouncyBallsLoader {...loaderProps} />
				</div>
				<Button
					text={'no'}
					type={'dark'}
					size={'small'}
					disabled={loading}
					onClick={() => {
						setModal(false);
						setLoading(false);
					}}
				/>
			</Modal>

			<div style={{ height: 'calc(0.5em + 26px)' }}></div>
		</>
	);
}
