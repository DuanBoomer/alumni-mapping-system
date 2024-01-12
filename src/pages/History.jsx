import Header from '../components/Header';
import EventCard from '../components/EventCard';
import { DataContext } from '../App';
import { useContext } from 'react';
export default function History() {
	const { eventsData } = useContext(DataContext);
	return (
		<>
			<Header text={'History'} />
			{
				// no events scheduled ever
				eventsData.done.length === 0 && eventsData.pending.length === 0 ? (
					<>
						<p style={styles.text}>No events ever</p>
					</>
				) : (
					<>
						{
							// no pending events
							eventsData.pending.length === 0 ? (
								<p style={styles.text}>No pending events</p>
							) : (
								<>
									<p style={styles.text}>Pending</p>
									{eventsData.pending.map((item, index) => {
										return (
											<EventCard
												key={index}
												eventData={{ ...item, type: 'done' }}
											/>
										);
									})}
								</>
							)
						}

						{
							// no completed events
							eventsData.done.length === 0 ? (
								<p style={styles.text}>No done events</p>
							) : (
								<>
									<p style={styles.text}>Done</p>
									{eventsData.done.map((item, index) => {
										return (
											<EventCard
												key={index}
												eventData={item}
											/>
										);
									})}
								</>
							)
						}
					</>
				)
			}
		</>
	);
}

const styles = {
	text: {
		margin: '0',
		padding: '0 0.5em',
		color: 'var(--text-color-dark)',
		fontFamily: 'Poppins',
		fontSize: 'var(--font-size-lg)',
		fontStyle: 'normal',
		fontWeight: 400,
		lineHeight: 'normal',
		letterSpacing: '-0.333px',
	},
};
