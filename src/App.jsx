import { BrowserRouter as Main, Routes, Route } from 'react-router-dom'
import '../src/styling/global.css'
import Home from "./pages/Home";
import Login from './pages/Login';
import Chat from './pages/Chat';
import Details from './pages/Details';
import Docs from './pages/Docs';
import Downloads from './pages/Downloads';
import EditProfile from './pages/EditProfile';
import EventDetails from './pages/EventDetails';
import History from './pages/History';
import Profile from './pages/Profile';
import ScheduleMeet from './pages/ScheduleMeet';
import Navbar from './components/Navbar';
import Loading from './components/Loading';
import Logout from './pages/Logout';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [showLoadingScreen, setShowLoadingScreen] = useState(false)
  // const [loginData, setLoginData] = useState()
  const [alumniData, setAlumniData] = useState({ name: "", batch: "", company: "", position: "", email: "", desc: "", image: "", expertise: [""] })
  const [studentsData, setStudentsData] = useState([{ roll_no: "", name: "", email: "", stream: "", student_coordinator: "", alumni: "", desc: "", course: "", image: "" }])
  const [primaryUserData, setPrimaryUserData] = useState({ ...alumniData, ...studentsData[0] })
  const [eventsData, setEventsData] = useState({ "pending": [], "done": [] })

  useEffect(() => {
    // var  data = {
    //   email: "",
    //   type: ""
    // }
    var data = JSON.parse(localStorage.getItem("data"))

    // fetch primary data
    if (data.email) {
      axios.get(`${API_BASE}/data/${data.email}`)
        .then((response) => {
          response = response.data
          // // console.log(response);
          setPrimaryUserData(response)
        })
        .catch((err) => {
          // console.log(err);
        })

      // fetch alumni data
      axios.get(`${API_BASE}/data/${data.type === "student" ? data.alumni : data.email}`)
        .then((response) => {
          response = response.data
          // // console.log(response);
          setAlumniData(response)
        })
        .catch((err) => {
          // console.log(err); 
        })

      // fetch students under alumni data
      axios.get(`${API_BASE}/data/students/${data.type === "student" ? data.alumni : data.email}`)
        .then((response) => {
          response = response.data
          // // console.log(response);
          setStudentsData(response)
          // setShowLoadingScreen(false)
        })
        .catch((err) => {
          // console.log(err);
        })

      // fetch all events data
      axios.get(`${API_BASE}/event/history/${data.type === "student" ? data.alumni : data.email}`)
        .then((response) => {
          response = response.data
          // console.log(response);
          setEventsData(response)
          setShowLoadingScreen(false)
        })
        .catch((err) => {
          // console.log(err);
        })
    }

    // // console.log(primaryUserData);
    // // console.log(alumniData);
    // // console.log(studentsData);
    // // console.log(eventsData);

  }, [showLoadingScreen])

  return (
    <>
      <Main>
        <Routes>
          <Route path='/' element={<Login loadingScreen={setShowLoadingScreen} />} />
          <Route path='/home' element={<Home alumniData={alumniData} studentsData={studentsData} eventsData={eventsData} />} />
          <Route path='/chat' element={<Chat primaryUserData = {primaryUserData}/>} />
          <Route path='/details' element={<Details />} />
          <Route path='/docs' element={<Docs />} />
          <Route path='/downloads' element={<Downloads eventsData={eventsData} />} />
          <Route path='/editprofile' element={<EditProfile primaryUserData={primaryUserData} setPrimaryUserData={setPrimaryUserData} />} setAlumniData={setAlumniData} />
          <Route path='/eventdetails' element={<EventDetails setEventsData={setEventsData} />} />
          <Route path='/history' element={<History eventsData={eventsData} />} />
          <Route path='/profile' element={<Profile primaryUserData={primaryUserData} />} />
          <Route path='/schedulemeet' element={<ScheduleMeet alumni={alumniData.email} setEventsData={setEventsData} />} />
          <Route path='/logout' element={<Logout />} />
          
        </Routes>

        <Loading show={showLoadingScreen} />
        <Navbar />

      </Main>
    </>
  );
}
// export const API_BASE = "http://127.0.0.1:8000";
export const API_BASE = "https://ams-backend-bdx5.onrender.com";
export default App;
