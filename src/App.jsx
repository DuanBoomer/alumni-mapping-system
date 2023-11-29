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
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [showLoadingScreen, setShowLoadingScreen] = useState(false)
  const [primaryUserData, setPrimaryUserData] = useState()
  const [alumniData, setAlumniData] = useState()
  const [studentsData, setStudentsData] = useState()

  function fetch_data(data) {
    // fetch primary data
    axios.get(`${API_BASE}/data/${data.email}`)
      .then((response) => {
        response = response.data
        console.log(response);
        setPrimaryUserData(response)
      })
      .catch((err) => {
        console.log(err);
      })

    // fetch alumni data
    axios.get(`${API_BASE}/data/${data.type == "student" ? data.alumni : data.email}`)
      .then((response) => {
        response = response.data
        console.log(response);
        setAlumniData(response)
      })
      .catch((err) => {
        console.log(err);
      })

    // fetch students under alumni data
    axios.get(`${API_BASE}/data/students/${data.type == "student" ? data.alumni : data.email}`)
      .then((response) => {
        response = response.data
        console.log(response);
        setStudentsData(response)
        setShowLoadingScreen(false)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <>
      <Main>
        <Routes>
          <Route path='/' element={<Login loginScreen={setShowLoadingScreen} fetch_data={fetch_data} />} />
          <Route path='/home' element={<Home alumniData={alumniData} studentsData={studentsData}/>} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/details' element={<Details />} />
          <Route path='/docs' element={<Docs />} />
          <Route path='/downloads' element={<Downloads />} />
          <Route path='/editprofile' element={<EditProfile />} />
          <Route path='/eventdetails' element={<EventDetails />} />
          <Route path='/history' element={<History />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/schedulemeet' element={<ScheduleMeet />} />
        </Routes>

        <Loading show={showLoadingScreen} />
        <Navbar />

      </Main>
    </>
  );
}
export const API_BASE = "http://127.0.0.1:8000";
export default App;
