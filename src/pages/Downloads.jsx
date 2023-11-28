import Header from "../components/Header";
import Doc from "../components/Doc";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Downloads() {

  const [events, setEvents] = useState([{ "docs": [] }])
  console.log(events);

  useEffect(() => {
    axios.get(`https://ams-backend-bdx5.onrender.com/events/alumni/${localStorage.getItem("userID")}`)
      .then((response) => {
        setEvents([...response.data.pending, ...response.data.done])
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])


  const styles = {
    date: {
      color: "#37352F",
      fontFamily: "Poppins",
      fontSize: "var(--font-size-lg)",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "normal",
      letterSpacing: "-0.333px",
    },
    big_text: {
      color: "#37352F",
      fontFamily: "Poppins",
      fontSize: "var(--font-size-lg)",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "114%",
      letterSpacing: "-0.333px"
    },

  }
  return (
    <div style={{ padding: "1em 1em 3em 1em" }}>
      <Header text={"Download"} />
      {
        events.length != 0
        ? events.map((event, index) => {
          return (
            <div>
              {
                event.docs.length == 0
                  ? <></>
                  : <p key={index} style={styles.date}>{event.date}</p>
              }
              {
                event.docs.map((doc, index) => {
                  return <Doc key={index} text={doc} />
                })
              }
            </div>
          )
        })
        : <p style={styles.big_text}>No Documents</p>
      }
    </div>
  )
}