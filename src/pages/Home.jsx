// import React from 'react'
// import "../styling/home.css"
import Header from '../components/Header'
import EventCard from '../components/EventCard'
import ProfileCard from '../components/ProfileCard'

import { useLocation } from 'react-router-dom'
import { getOngoingEvent } from '../back/Events'
import { getAlumniDetails, getStudentDetails } from '../back/User'

function Home() {

  const location = useLocation()
  const userID = location.state.userID
  const event = getOngoingEvent(userID)
  const alumni = getAlumniDetails(userID)
  const students = getStudentDetails(userID)

  // console.log(students);

  const styles = {
    text: {
      margin: "0",
      padding: "0 0.5em",
      color: "var(--text-color-dark)",
      fontFamily: "Poppins",
      fontSize: "1.75rem",
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
          : <EventCard time={[event.start_time, event.end_time].join(" to ")} day={event.day} date={event.date} title={event.title} type={event.type} desc={event.desc} link={event.link} id={userID}/>

      }

      <p style={styles.text}>Alumni</p>
      <ProfileCard name={alumni.name} expertise={alumni.expertise} company={alumni.company} id={userID} type={"alumni"}/>
      <p style={styles.text}>Students</p>

      {
        students.map((student) => {
          return <ProfileCard name={student.name} company={`${student.course} ${student.stream} | ${student.year} year`} id={student.id} type={"student"}/>
        })
      }

    </div>
  )
}

export default Home