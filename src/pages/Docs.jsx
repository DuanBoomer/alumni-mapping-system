import Header from '../components/Header';
import EventDetailsFlat from '../components/EventDetailsFlat';
import Doc from '../components/Doc';

import { useLocation } from 'react-router-dom';

export default function Docs() {
	const location = useLocation();
	const eventData = location.state.eventData;

	return (
		<div style={{ padding: '1em 1em 3em 1em' }}>
			<Header text={'Docs'} />
			<EventDetailsFlat eventData={eventData} />

			{eventData.docs.length !== 0 ? (
				eventData.docs.map((item, index) => {
					return (
						<Doc
							key={index}
							text={item}
						/>
					);
				})
			) : (
				<p>No documents</p>
			)}
		</div>
	);
}
