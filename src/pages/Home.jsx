import Header from '../components/Header'
import EventCard from '../components/EventCard'
import ProfileCard from '../components/ProfileCard'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
function Home() {

  const navigate = useNavigate()

  // if (!localStorage.getItem("userID")){
  //   navigate("/")
  // }

  const [students, setStudents] = useState([])
  const [alumni, setAlumni] = useState({})
  const [event, setEvent] = useState({})

  // console.log(students);

  useEffect(() => {
    axios.get(`https://ams-backend-bdx5.onrender.com/students/alumni/${localStorage.getItem("userID")}`)
      .then((response) => {
        if (response.status_code === 200){
          setStudents(response.data)
        }
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get(`https://ams-backend-bdx5.onrender.com/alumni/${localStorage.getItem("userID")}`)
      .then((response) => {
        setAlumni(response.data)
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get(`https://ams-backend-bdx5.onrender.com/ongoing_event/alumni/${localStorage.getItem("userID")}`)
      .then((response) => {
        setEvent(response.data)
      })
      .catch((error) => {
        console.log(error);
      })

  }, [])

  const styles = {
    text: {
      margin: "0",
      padding: "0 0.5em",
      color: "var(--text-color-dark)",
      fontFamily: "Poppins",
      fontSize: "var(--font-size-xl)",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "normal",
      letterSpacing: "-0.333px",
    },

    shadow_div: {
      margin: "2em 0",
      display: "flex",
      padding: "1em",
      borderRadius: "18px",
      background: "var(--main-bg-color)",
      boxShadow: "-11px -11px 22px 0px var(--light-shadow) inset, 11px 11px 22px 0px var(--dark-shadow) inset",
    }
  }

  return (
    <div style={{ padding: "1em 1em 3em 1em" }}>
      <Header text={"Home"} />

      {
        event.type === "no ongoing event"
          ? <div style={styles.shadow_div}>
            <p style={styles.text}>No ongoing Event</p>
          </div>
          : <EventCard time={[event.start_time, event.end_time].join(" to ")} day={event.day} date={event.date} title={event.title} type={event.type} desc={event.desc} link={event.link} />

      }

      <p style={styles.text}>Alumni</p>
      <ProfileCard name={alumni.name} expertise={alumni.expertise} company={alumni.company} id={localStorage.getItem("userID")} type={"alumni"} />
      <p style={styles.text}>Students</p>

      {
        students.map((student, index) => {
          return <ProfileCard key={index} name={student.name} company={`${student.course} ${student.stream} | ${student.year} year`} id={student.email} type={"student"} />
        })
      }

    </div>
  )
}

export default Home