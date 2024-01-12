import Header from '../components/Header';
import EventCard from '../components/EventCard';
import ProfileCard from '../components/ProfileCard';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useEffect, useContext } from 'react';
import { DataContext } from '../App';
// useRef, 

function Home() {
	const navigate = useNavigate();
	// const addbtnRef = useRef();
	const { alumniData, studentsData, eventsData } = useContext(DataContext);

	// console.log(alumniData);

	// useEffect(() => {
		// window.addEventListener('beforeinstallprompt', (event) => {
		// 	// Prevent the mini-infobar from appearing on mobile.
		// 	event.preventDefault();
		// 	console.log('👍', 'beforeinstallprompt', event);
		// 	// Stash the event so it can be triggered later.
		// 	window.deferredPrompt = event;
		// 	// Remove the 'hidden' class from the install button container.
		// 	// divInstall.classList.toggle('hidden', false);
		// });
		// addbtnRef.current?.addEventListener('click', async () => {
		// 	console.log('👍', 'butInstall-clicked');
		// 	const promptEvent = window.deferredPrompt;
		// 	if (!promptEvent) {
		// 		// The deferred prompt isn't available.
		// 		return;
		// 	}
		// 	// Show the install prompt.
		// 	promptEvent.prompt();
		// 	// Log the result
		// 	const result = await promptEvent.userChoice;
		// 	console.log('👍', 'userChoice', result);
		// 	// Reset the deferred prompt variable, since
		// 	// prompt() can only be called once.
		// 	window.deferredPrompt = null;
		// 	// Hide the install button.
		// 	// divInstall.classList.toggle('hidden', true);
		// });
		// window.addEventListener('appinstalled', (event) => {
		// 	console.log('👍', 'appinstalled', event);
		// 	// Clear the deferredPrompt so it can be garbage collected
		// 	window.deferredPrompt = null;
		// });
		// if (addbtnRef.current) {
		// 	let deferredPrompt;
		// 	window.addEventListener('beforeinstallprompt', (e) => {
		// 		e.preventDefault();
		// 		deferredPrompt = e;
		// 	});
		// 	addbtnRef.current.addEventListener('click', (e) => {
		// 		deferredPrompt?.prompt();
		// 		deferredPrompt?.userChoice
		// 			.then((choiceResult) => {
		// 				if (choiceResult.outcome === 'accepted') {
		// 					console.log('user accepted');
		// 				}
		// 				deferredPrompt = null;
		// 			})
		// 			.catch((error) => {
		// 				console.log(error);
		// 			});
		// 	});
		// }
		// return () => {
		// 	addbtnRef.current?.removeEventListener('click');
		// 	window.removeEventListener('beforeinstallprompt');
		// };
	// }, []);

	return (
		<>
			{alumniData && studentsData && eventsData ? (
				<>
					<Header text={'Home'} />
					{/* <button ref={addbtnRef}>add to home screen</button> */}

					{
						// No events to render
						eventsData.pending.length === 0 ? (
							<div style={styles.shadow_div}>
								<p style={styles.text}>No ongoing Event</p>
								<Button
									text={'History'}
									type={'dark'}
									size={'small'}
									onClick={() => navigate('/history')}
								/>
							</div>
						) : (
							// pending events are available
							eventsData.pending.map((event, index) => {
								return (
									<EventCard
										key={index}
										eventData={event}
									/>
								);
							})
						)
					}

					{/* Alumni Details */}
					<p style={styles.text}>Alumni</p>
					{alumniData.name ? (
						<ProfileCard data={alumniData} />
					) : (
						<div style={{ ...styles.shadow_div, width: '75%' }}>
							<p style={{ margin: 0 }}>Not logged in yet</p>
						</div>
					)}

					{/* Student Details */}
					<p style={styles.text}>Students</p>
					{studentsData.map((student, index) => {
						if (student.name) {
							// it is a old student / database is populated
							return (
								<ProfileCard
									key={index}
									data={student}
								/>
							);
						} else {
							// it is a new student / database is not populated
							return (
								<div style={{ ...styles.shadow_div, width: '75%' }}>
									<p style={{ margin: 0 }}>student has not logged in yet</p>
									<p style={{ margin: 0 }}>email: {student.email}</p>
								</div>
							);
						}
					})}
				</>
			) : null}
		</>
	);
}

export default Home;

const styles = {
	text: {
		margin: '0',
		// padding: "0 0.5em",
		color: 'var(--text-color-dark)',
		fontFamily: 'Poppins',
		fontSize: 'var(--font-size-xl)',
		fontStyle: 'normal',
		fontWeight: 400,
		lineHeight: 'normal',
		letterSpacing: '-0.333px',
	},

	shadow_div: {
		margin: '2em 0',
		padding: '1.5em',
		borderRadius: '18px',
		background: 'var(--main-bg-color)',
		boxShadow:
			'-11px -11px 22px 0px var(--light-shadow) inset, 11px 11px 22px 0px var(--dark-shadow) inset',
	},
};
