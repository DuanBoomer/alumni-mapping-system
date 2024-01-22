import { BrowserRouter as Main, Routes, Route } from 'react-router-dom';
import '../src/styling/global.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Details from './pages/Details';
import EditProfile from './pages/EditProfile';
import EventDetails from './pages/EventDetails';
import History from './pages/History';
import Profile from './pages/Profile';
import ScheduleMeet from './pages/ScheduleMeet';
import Navbar from './components/Navbar';
import Loading from './components/Loading';
import Logout from './pages/Logout';
import FirstTimeLogin from './pages/FirstTimeLogin';
import ResetPassword from './pages/ResetPassword';
import { io } from 'socket.io-client';
// import Docs from './pages/Docs';
// import Downloads from './pages/Downloads';
// import ContactFaculty from './pages/ContactFaculty';
import { useEffect, useRef, useState, createContext } from 'react';
import axios from 'axios';

const notLoadingPaths = ['/', '/logout'];
export const DataContext = createContext(null);

function App() {
	const SOCKET_URL = 'https://ams-chat-api.onrender.com/';
	const socketRef = useRef(null);
	// // const SOCKET_URL = "http://127.0.0.1:8000/"
	// // const [showLoadingScreen, setShowLoadingScreen] = useState(
	// // 	window.location.pathname === '/' ||
	// // 		window.location.pathname === '/firsttimelogin'
	// // 		? false
	// // 		: true
	// // );
	// const [alumniData, setAlumniData] = useState({
	// 	name: '',
	// 	batch: '',
	// 	company: '',
	// 	position: '',
	// 	email: '',
	// 	desc: '',
	// 	image: '',
	// 	expertise: [''],
	// });
	// const [studentsData, setStudentsData] = useState([
	// 	{
	// 		roll_no: '',
	// 		name: '',
	// 		email: '',
	// 		stream: '',
	// 		student_coordinator: '',
	// 		alumni: '',
	// 		desc: '',
	// 		course: '',
	// 		image: '',
	// 	},
	// ]);
	// const [primaryUserData, setPrimaryUserData] = useState({
	// 	...alumniData,
	// 	...studentsData[0],
	// });
	// const [eventsData, setEventsData] = useState({ pending: [], done: [] });
	// const [chatData, setChatData] = useState([{ text: '', sender: '' }]);

	// useEffect(() => {
	// 	var data = JSON.parse(localStorage.getItem('data'));

	// 	// fetch primary data
	// 	if (data && data.email) {
	// 		axios
	// 			.get(`${API_BASE}/data/${data.email}`)
	// 			.then((response) => {
	// 				response = response.data;
	// 				setPrimaryUserData(response);
	// 			})
	// 			.catch((err) => {
	// 				// console.log(err);
	// 			});

	// 		// fetch alumni data
	// 		axios
	// 			.get(
	// 				`${API_BASE}/data/${
	// 					data.type === 'student' ? data.alumni : data.email
	// 				}`
	// 			)
	// 			.then((response) => {
	// 				response = response.data;
	// 				setAlumniData(response);
	// 				socketRef.current = io(SOCKET_URL, { auth: response.email });
	// 				socketRef.current.on('msg', (data) => {
	// 					console.log('chat on');
	// 					setChatData((prev) => {
	// 						return [...prev, data];
	// 					});
	// 				});

	// 				socketRef.current.on('msgdelete', (data) => {
	// 					setChatData((prev) => {
	// 						console.log('chat del');
	// 						var newChat = prev.filter(
	// 							(chat) =>
	// 								!(chat.text === data.text && chat.sender === data.sender)
	// 						);
	// 						return newChat;
	// 					});
	// 				});

	// 				socketRef.current.on('event_updates', (data) => {
	// 					console.log('event update');
	// 					setEventsData(data);
	// 				});
	// 			})
	// 			.catch((err) => {
	// 				// console.log(err);
	// 			});

	// 		// fetch students under alumni data
	// 		axios
	// 			.get(
	// 				`${API_BASE}/data/students/${
	// 					data.type === 'student' ? data.alumni : data.email
	// 				}`
	// 			)
	// 			.then((response) => {
	// 				response = response.data;
	// 				setStudentsData(response);
	// 			})
	// 			.catch((err) => {
	// 				// console.log(err);
	// 			});

	// 		// fetch all events data
	// 		axios
	// 			.get(
	// 				`${API_BASE}/event/history/${
	// 					data.type === 'student' ? data.alumni : data.email
	// 				}`
	// 			)
	// 			.then((response) => {
	// 				response = response.data;
	// 				setEventsData(response);
	// 			})
	// 			.catch((err) => {
	// 				// console.log(err);
	// 			});

	// 		// fetch chat data
	// 		axios
	// 			.get(
	// 				`${API_BASE}/chat/${
	// 					data.type === 'student' ? data.alumni : data.email
	// 				}`
	// 			)
	// 			.then((response) => {
	// 				response = response.data;
	// 				setChatData(response);
	// 				// setShowLoadingScreen(false);
	// 			})
	// 			.catch((err) => {
	// 				// console.log(err);
	// 			});
	// 	}
	// }, []);

	// const [fetch, setFetch] = useState(true);

	// const [loading, setLoading] = useState(
	// 	!notLoadingPaths.includes(window.location.pathname)
	// );

	const [trigger, setTrigger] = useState(0);
	const [alumniData, setAlumniData] = useState();
	const [eventsData, setEventsData] = useState();
	const [studentsData, setStudentsData] = useState();

	useEffect(() => {
		// console.log('effect');
		if (
			!(Boolean(alumniData) && Boolean(eventsData) && Boolean(studentsData)) &&
			!notLoadingPaths.includes(window.location.pathname)
		) {
			// console.log('fetching...');
			let primary_user_data = JSON.parse(
				window.localStorage.getItem('PrimaryUserData')
			);
			var alumni_email;
			if (primary_user_data?.alumni) {
				alumni_email = primary_user_data.alumni;
			} else {
				alumni_email = primary_user_data.email;
			}
			axios
				.get(`${API_BASE}/data/${alumni_email}`)
				.then((response) => {
					setAlumniData(response.data);
					socketRef.current = io(SOCKET_URL, { auth: response.data.email });
					socketRef.current.on('event_updates', (data) => {
						setEventsData(data);
					});
					// console.log('alumni-data');
				})
				.catch((err) => {});
			axios
				.get(`${API_BASE}/data/students/${alumni_email}`)
				.then((response) => {
					setStudentsData(response.data);
					// console.log('students-data');
				})
				.catch((err) => {});
			axios
				.get(`${API_BASE}/event/history/${alumni_email}`)
				.then((response) => {
					setEventsData(response.data);
					// console.log('event-data');
				})
				.catch((err) => {});
			// console.log('loading false');
		}
	}, [trigger]);

	return (
		<>
			{!(Boolean(alumniData) && Boolean(eventsData) && Boolean(studentsData)) &&
			!notLoadingPaths.includes(window.location.pathname) ? (
				<Loading />
			) : (
				<DataContext.Provider
					value={{
						alumniData: alumniData,
						studentsData: studentsData,
						eventsData: eventsData,
					}}>
					<Main>
						<Routes>
							<Route
								path='/'
								element={<Login setTrigger={setTrigger} />}
							/>
							<Route
								path='/home'
								element={<Home />}
							/>
							<Route
								path='/logout'
								element={<Logout />}
							/>
							<Route
								path='/profile'
								element={<Profile />}
							/>

							<Route
								path='/details'
								element={<Details />}
							/>
							<Route
								path='/editprofile'
								element={
									<EditProfile
										setAlumniData={setAlumniData}
										setStudentsData={setStudentsData}
									/>
								}
							/>
							<Route
								path='/eventdetails'
								element={<EventDetails setEventsData={setEventsData} />}
							/>
							<Route
								path='/history'
								element={<History />}
							/>
							<Route
								path='/resetpassword'
								element={<ResetPassword />}
							/>
							<Route
								path='/schedulemeet'
								element={<ScheduleMeet />}
							/>
							<Route
								path='/firsttimelogin'
								element={<FirstTimeLogin />}
							/>
							<Route
								path='/chat'
								element={<Chat socket={socketRef.current} />}
							/>
						</Routes>
						{/* <Loading show={showLoadingScreen} /> */}
						<Navbar />
					</Main>
				</DataContext.Provider>
			)}
		</>
	);
}
// export const API_BASE = "http://127.0.0.1:8000";
export const API_BASE = 'https://ams-backend-bdx5.onrender.com';
export default App;
