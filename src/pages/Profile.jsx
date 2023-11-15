import Header from '../components/Header'
import Button from '../components/Button'
import profile_image from "../assets/person.jpeg"

import { useLocation, useNavigate } from 'react-router-dom'
import { getAlumniDetails } from '../back/User'

function Profile({ logo, person }) {

  const location = useLocation()
  const navigate = useNavigate()
  const alumni = getAlumniDetails(location.state.id)

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
    navigate(path, { state: { id: location.state.id } })
  }
  return (
    <div style={{ padding: "1em 1em 3em 1em" }}>
      <Header text={'Profile'} />

      <div style={styles.profile_div}>
        <img style={styles.profile_image} src={profile_image} alt='profile'/>
        <p style={styles.name}>{alumni.name}</p>
        <p style={styles.text}>{alumni.expertise.join(" | ")}</p>
        <p style={styles.text}>{alumni.company}</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75em" }}>
        <Button text={"Downloads"} type="light" size="large" onClick={() => handleClick("/downloads")} />
        <Button text={"Edit Profile"} type="light" size="large" onClick={() => handleClick("/editprofile")} />
        <Button text={"Schedule Meet"} type="light" size="large" onClick={() => handleClick("/schedulemeet")} />
        <Button text={"Log Out"} type="light" size="large" onClick={() => handleClick("/")} />
      </div>
    </div>
  )
}

export default Profile