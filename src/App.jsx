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
import { useState } from 'react';


function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [userID, setUserID] = useState("")
  return (
    <>
      <Main>
        <Routes>
          <Route path='/' element={<Login onLogin={(login, id) => { setLoggedIn(login); setUserID(id) }} />} />
          <Route path='/home' element={<Home id={userID} />} />
          <Route path='/chat' element={<Chat id={userID} />} />
          <Route path='/details' element={<Details id={userID} />} />
          <Route path='/docs' element={<Docs id={userID} />} />
          <Route path='/downloads' element={<Downloads id={userID} />} />
          <Route path='/editprofile' element={<EditProfile id={userID} />} />
          <Route path='/eventdetails' element={<EventDetails id={userID} />} />
          <Route path='/history' element={<History id={userID} />} />
          <Route path='/profile' element={<Profile id={userID} />} />
          <Route path='/schedulemeet' element={<ScheduleMeet id={userID} />} />
        </Routes>

        <Navbar id={userID} />

      </Main>
    </>
  );
}

export default App;
