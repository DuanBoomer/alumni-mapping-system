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
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function App() {
	const SOCKET_URL = 'https://ams-chat-api.onrender.com/';
	// const SOCKET_URL = "http://127.0.0.1:8000/"
	const socketRef = useRef(null);
	const [showLoadingScreen, setShowLoadingScreen] = useState(
		window.location.pathname === '/' ||
			window.location.pathname === '/firsttimelogin'
			? false
			: true
	);
	const [alumniData, setAlumniData] = useState({
		name: '',
		batch: '',
		company: '',
		position: '',
		email: '',
		desc: '',
		image: '',
		expertise: [''],
	});
	const [studentsData, setStudentsData] = useState([
		{
			roll_no: '',
			name: '',
			email: '',
			stream: '',
			student_coordinator: '',
			alumni: '',
			desc: '',
			course: '',
			image: '',
		},
	]);
	const [primaryUserData, setPrimaryUserData] = useState({
		...alumniData,
		...studentsData[0],
	});
	const [eventsData, setEventsData] = useState({ pending: [], done: [] });
	const [chatData, setChatData] = useState([{ text: '', sender: '' }]);

	useEffect(() => {
		var data = JSON.parse(localStorage.getItem('data'));

		// fetch primary data
		if (data && data.email && showLoadingScreen) {
			axios
				.get(`${API_BASE}/data/${data.email}`)
				.then((response) => {
					response = response.data;
					setPrimaryUserData(response);
				})
				.catch((err) => {
					// console.log(err);
				});

			// fetch alumni data
			axios
				.get(
					`${API_BASE}/data/${
						data.type === 'student' ? data.alumni : data.email
					}`
				)
				.then((response) => {
					response = response.data;
					setAlumniData(response);
					socketRef.current = io(SOCKET_URL, { auth: response.email });
					socketRef.current.on('msg', (data) => {
						console.log('chat on');
						setChatData((prev) => {
							return [...prev, data];
						});
					});

					socketRef.current.on('msgdelete', (data) => {
						setChatData((prev) => {
							console.log('chat del');
							var newChat = prev.filter(
								(chat) =>
									!(chat.text === data.text && chat.sender === data.sender)
							);
							return newChat;
						});
					});

					socketRef.current.on('event_updates', (data) => {
						console.log('event update');
						setEventsData(data);
					});
				})
				.catch((err) => {
					// console.log(err);
				});

			// fetch students under alumni data
			axios
				.get(
					`${API_BASE}/data/students/${
						data.type === 'student' ? data.alumni : data.email
					}`
				)
				.then((response) => {
					response = response.data;
					setStudentsData(response);
				})
				.catch((err) => {
					// console.log(err);
				});

			// fetch all events data
			axios
				.get(
					`${API_BASE}/event/history/${
						data.type === 'student' ? data.alumni : data.email
					}`
				)
				.then((response) => {
					response = response.data;
					setEventsData(response);
				})
				.catch((err) => {
					// console.log(err);
				});

			// fetch chat data
			axios
				.get(
					`${API_BASE}/chat/${
						data.type === 'student' ? data.alumni : data.email
					}`
				)
				.then((response) => {
					response = response.data;
					setChatData(response);
					setShowLoadingScreen(false);
				})
				.catch((err) => {
					// console.log(err);
				});
		}
	}, [showLoadingScreen]);

	return (
		<>
			<Main>
				<Routes>
					<Route
						path='/'
						element={<Login setShowLoadingScreen={setShowLoadingScreen} />}
					/>
					<Route
						path='/home'
						element={
							<Home
								alumniData={alumniData}
								studentsData={studentsData}
								eventsData={eventsData}
							/>
						}
					/>
					<Route
						path='/chat'
						element={
							<Chat
								socket={socketRef.current}
								chatData={chatData}
								setChatData={setChatData}
								primaryUserData={primaryUserData}
								alumniData={alumniData}
								studentsData={studentsData}
							/>
						}
					/>
					<Route
						path='/details'
						element={<Details />}
					/>
					<Route
						path='/editprofile'
						element={
							<EditProfile
								primaryUserData={primaryUserData}
								setPrimaryUserData={setPrimaryUserData}
								setAlumniData={setAlumniData}
								setStudentsData={setStudentsData}
							/>
						}
					/>
					<Route
						path='/eventdetails'
						element={
							<EventDetails
								setEventsData={setEventsData}
								primaryUserData={primaryUserData}
							/>
						}
					/>
					<Route
						path='/history'
						element={<History eventsData={eventsData} />}
					/>
					<Route
						path='/profile'
						element={<Profile primaryUserData={primaryUserData} />}
					/>
					<Route
						path='/resetpassword'
						element={<ResetPassword primaryUserData={primaryUserData} />}
					/>
					<Route
						path='/schedulemeet'
						element={<ScheduleMeet alumni={alumniData.email} />}
					/>
					<Route
						path='/logout'
						element={<Logout />}
					/>
					<Route
						path='/firsttimelogin'
						element={<FirstTimeLogin />}
					/>
				</Routes>
				<Loading show={showLoadingScreen} />
				<Navbar />
			</Main>
		</>
	);
}
// export const API_BASE = "http://127.0.0.1:8000";
export const API_BASE = 'https://ams-backend-bdx5.onrender.com';
export default App;
