import Header from '../components/Header';
import EventCard from '../components/EventCard';
import ProfileCard from '../components/ProfileCard';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useEffect, useRef } from 'react';

function Home() {
	const navigate = useNavigate();
	const location = useLocation();
	const addbtnRef = useRef();

	console.log(location.state);

	useEffect(() => {
		console.log('home page');
	}, [])

	// useEffect(() => {
	// 	let deferredPrompt;
	// 	window.addEventListener('beforeinstallprompt', (e) => {
	// 		e.preventDefault();
	// 		deferredPrompt = e;
	// 		// addbtnRef.current.style.display = 'block'
	// 	});

	// 	if (addbtnRef) {
	// 		addbtnRef.current.addEventListener('click', (e) => {
	// 			deferredPrompt?.prompt();
	// 			deferredPrompt?.userChoice
	// 				.then((choiceResult) => {
	// 					if (choiceResult.outcome === 'accepted') {
	// 						console.log('user accepted');
	// 					}

	// 					deferredPrompt = null;
	// 				})
	// 				.catch((error) => {
	// 					console.log(error);
	// 				});
	// 		});
	// 	}

	// 	// return addbtnRef.current.removeEventListener('click'); window.removeEventListener('beforeinstallprompt');
	// }, []);

	return (
		<>
			<Header text={'Home'} />
			{/* {alumniData && studentsData ? (
				<div style={{ padding: '1em 1em 3em 1em' }}>
					<Header text={'Home'} />

					<button ref={addbtnRef}>add to home screen</button>
					{eventsData.pending.length === 0 ? (
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
						eventsData.pending.map((event, index) => {
							return (
								<EventCard
									key={index}
									eventData={event}
									history={eventsData}
									alumni={alumniData.email}
								/>
							);
						})
					)}

					<p style={styles.text}>Alumni</p>
					<ProfileCard data={alumniData} />

					<p style={styles.text}>Students</p>
					{studentsData.map((student, index) => {
						if (student.name) {
							return (
								<ProfileCard
									key={index}
									data={student}
								/>
							);
						} else {
							return (
								<div style={{ ...styles.shadow_div, width: '75%' }}>
									<p style={{ margin: 0 }}>student has not logged in yet</p>
									<p style={{ margin: 0 }}>email: {student.email}</p>
								</div>
							);
						}
					})}
				</div>
			) : (
				<></>
			)} */}
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
