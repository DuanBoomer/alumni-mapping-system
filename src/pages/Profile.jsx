import Header from '../components/Header'
import Button from '../components/Button'
import profile_image from "../assets/person.jpeg"

import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Profile() {

  const navigate = useNavigate()
  const [alumni, setAlumni] = useState({ "expertise": [] })

  useEffect(() => {
    if (localStorage.getItem("studentID")) {
      axios.get(`https://ams-backend-bdx5.onrender.com/student/${localStorage.getItem("studentID")}`)
        .then((response) => {
          console.log(response.data);
          setAlumni(response.data)
        })
        .catch((error) => {
          console.log(error);
        })
    }
    else {
      axios.get(`https://ams-backend-bdx5.onrender.com/alumni/${localStorage.getItem("userID")}`)
        .then((response) => {
          setAlumni(response.data)
        })
        .catch((error) => {
          console.log(error);
        })
    }

  }, [])

  const styles = {
    profile_div: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "1.5em",
      marginBottom: "1.5em",

      borderRadius: "18px",
      background: "#E0E0E0",
      boxShadow: "-8px -8px 16px 0px #FFF, 8px 8px 16px 0px #BEBEBE"
    },
    profile_image: {
      height: "150px",
      borderRadius: "10px",
    },

    name: {
      margin: "0",
      color: "#37352F",
      textAlign: "center",
      fontFamily: "Poppins",
      fontSize: "var(--font-size-lg)",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "normal",
    },

    text: {
      margin: "0",
      color: "#5B574E",
      textAlign: "center",
      fontFamily: "Poppins",
      fontSize: "var(--font-size-sm)",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "normal",
    }
  }

  function handleClick(path) {
    navigate(path)
  }

  function handleLogout() {
    localStorage.setItem("userID", "")
    localStorage.setItem("studentID", "")
    navigate("/")
  }

  return (
    <div style={{ padding: "1em 1em 3em 1em" }}>
      <Header text={'Profile'} />

      <div style={styles.profile_div}>
        <img style={styles.profile_image} src={alumni.image} alt='profile' />
        <p style={styles.name}>{alumni.name}</p>

        {
          alumni.alumni
            ? <div>
              <p style={styles.text}>{alumni.roll_no}</p>
              <p style={styles.text}>{alumni.course + " " + alumni.stream}</p>
            </div>
            : <div>
              <p style={styles.text}>{alumni.expertise.join(" | ")}</p>
              <p style={styles.text}>{alumni.company}</p>
            </div>
        }

      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75em" }}>
        <Button text={"Downloads"} type="light" size="large" onClick={() => handleClick("/downloads")} />
        <Button text={"Edit Profile"} type="light" size="large" onClick={() => handleClick("/editprofile")} />
        {
          alumni.alumni
            ? <></>
            : <Button text={"Schedule Meet"} type="light" size="large" onClick={() => handleClick("/schedulemeet")} />
        }

        <Button text={"Log Out"} type="light" size="large" onClick={handleLogout} />
      </div>
    </div>
  )
}

export default Profile