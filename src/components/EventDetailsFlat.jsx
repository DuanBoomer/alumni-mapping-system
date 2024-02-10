import Button from './Button';
import { useCallback, useState } from 'react';
import Modal from './Modal';
import InputField from './InputField';

export default function EventDetailsFlat({ eventData }) {
	const handleJoinClick = useCallback(() => {
		window.open(eventData.link);
	}, []);

	const primaryUserData = JSON.parse(
		window.localStorage.getItem('PrimaryUserData')
	);

	const [newTalkingPoint, setNewTalkingPoint] = useState();
	const [talkingPoints, setTalkingPoints] = useState([]);
	const [enterTalkingPoints, setEnterTalkingPoints] = useState(false);

	return (
		<>
			<p style={styles.big_text}>{eventData.title}</p>

			<div style={{ margin: '1.5em 0' }}>
				<p style={styles.medium_text}>{eventData.time}</p>

				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<p style={styles.medium_text}>{eventData.day}</p>
					<p style={styles.medium_text}>{eventData.date}</p>
				</div>
				<p style={styles.small_text}>{eventData.desc}</p>
			</div>

			<div style={{ display: 'flex', alignItems: 'center' }}>
				<p style={{ ...styles.medium_text, marginRight: '0.5em' }}>
					Talking Points
				</p>
				{primaryUserData.alumni ? null : (
					<Button
						text={'+'}
						onClick={() => {
							setEnterTalkingPoints(true);
						}}
					/>
				)}
			</div>
			<ul style={{ width: 'auto', wordBreak: 'break-word' }}>
				{talkingPoints.map((text) => {
					return <li style={styles.small_text}>{text}</li>;
				})}
			</ul>
			<Button
				text={'Join'}
				type={'light'}
				size={'big'}
				onClick={handleJoinClick}
			/>

			<Modal
				showModal={enterTalkingPoints}
				setShowModal={setEnterTalkingPoints}>
				<div style={{ margin: '1em' }}>
					<InputField
						title={'Add a talking point'}
						type={'textarea'}
						rows={5}
						state={newTalkingPoint}
						setState={setNewTalkingPoint}>
						modal
					</InputField>
					<Button
						text={'Add'}
						onClick={() => {
							setTalkingPoints((prev) => {
								return [...prev, newTalkingPoint];
							});
							setNewTalkingPoint('');
							setEnterTalkingPoints(false);
						}}
					/>
				</div>
			</Modal>
		</>
	);
}

const styles = {
	big_text: {
		color: '#37352F',
		fontFamily: 'Poppins',
		fontSize: 'var(--font-size-lg)',
		fontStyle: 'normal',
		fontWeight: '400',
		lineHeight: '114%',
		letterSpacing: '-0.333px',
	},

	medium_text: {
		margin: '0',
		color: '#37352F',
		fontFamily: 'Poppins',
		fontSize: 'var(--font-size-md)',
		fontStyle: 'normal',
		fontWeight: '400',
		lineHeight: 'normal',
		letterSpacing: '-0.333px',
	},

	small_text: {
		margin: '1em 0',
		color: '#5B574E',
		fontFamily: 'Poppins',
		fontSize: 'var(--font-size-sm)',
		fontStyle: 'normal',
		fontWeight: '400',
		lineHeight: '87%',
	},
};
