import Button from './Button';
import { useNavigate } from 'react-router-dom';

export default function EventCard({ eventData }) {
	const navigate = useNavigate();

	function handleViewClick() {
		navigate('/eventdetails', {
			state: {
				eventData: eventData,
			},
		});
	}

	function handleHistoryClick() {
		navigate('/history');
	}

	return (
		<div style={styles.card}>
			<div style={styles.partition}>
				<p
					style={
						styles.time
					}>{`${eventData.start_time} to ${eventData.end_time}`}</p>

				<div>
					<p style={styles.day}>{eventData.day}</p>
					<p style={styles.date}>{eventData.date}</p>

					{eventData.type === 'pending' ? (
						<Button
							text={'View'}
							type={'dark'}
							size={'small'}
							onClick={handleViewClick}
						/>
					) : null}
				</div>
			</div>

			<div style={styles.line}></div>

			<div style={{ ...styles.partition, alignItems: 'flex-end' }}>
				<p style={styles.title}>{eventData.title}</p>

				{eventData.type === 'pending' ? (
					<Button
						text={'History'}
						type={'dark'}
						size={'small'}
						onClick={handleHistoryClick}
					/>
				) : (
					<Button
						text={'Details'}
						type={'dark'}
						size={'small'}
						onClick={handleViewClick}
					/>
				)}
			</div>
		</div>
	);
}

const styles = {
	card: {
		margin: '2em 0',
		display: 'flex',
		padding: '1em',
		borderRadius: '18px',
		background: 'var(--main-bg-color)',
		boxShadow:
			'-11px -11px 22px 0px var(--light-shadow), 11px 11px 22px 0px var(--dark-shadow)',
	},

	partition: {
		flexGrow: 1,
		flexBasis: 0,
		flexShrink: 0,

		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},

	time: {
		margin: '0 0 1em 0',
		color: 'var(--text-color-dark)',
		fontFamily: 'Poppins',
		fontSize: 'var(--font-size-lg)',
		fontStyle: 'normal',
		fontWeight: 400,
		lineHeight: 'normal',
		letterSpacing: '-0.333px',
	},

	day: {
		margin: '0',
		color: 'var(--text-color-dark)',
		fontFamily: 'Poppins',
		fontSize: 'var(--font-size-md)',
		fontStyle: 'normal',
		fontWeight: 400,
		lineHeight: 'normal',
		letterSpacing: '-0.333px',
	},
	title: {
		margin: '0',
		color: 'var(--text-color-dark)',
		fontFamily: 'Poppins',
		textAlign: 'right',
		fontSize: 'var(--font-size-md)',
		fontStyle: 'normal',
		fontWeight: 400,
		lineHeight: 'normal',
		letterSpacing: '-0.333px',
	},

	date: {
		margin: '0',
		color: 'var(--text-color-light)',
		fontFamily: 'Poppins',
		fontSize: 'var(--font-size-md)',
		fontStyle: 'normal',
		fontWeight: 400,
		lineHeight: 'normal',
		letterSpacing: '-0.333px',
	},

	line: {
		width: '7px',
		margin: '0em 0.5em',
		borderRadius: '100px',
		boxShadow: '2px 2px 4px 0px #BEBEBE inset, -2px -2px 4px 0px #FFF inset',
	},
};
