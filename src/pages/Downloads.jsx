import Header from "../components/Header";
import Doc from "../components/Doc";

import { useLocation } from "react-router-dom";
import { getEventsHistory } from "../back/Events";

export default function Downloads() {

  const location = useLocation()
  const events = getEventsHistory(location.state.id)

  const styles = {
    date: {
      color: "#37352F",
      fontFamily: "Poppins",
      fontSize: "24px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "normal",
      letterSpacing: "-0.333px",
    }
  }
  return (
    <div style={{ padding: "1em 1em 3em 1em" }}>
      <Header text={"Download"} />
      {
        events.map((event, index) => {
          return (
            <div>
              <p key={index} style={styles.date}>{event.date}</p>
              {
                event.docs.map((doc, index) => {
                  return <Doc key={index} text={doc} />
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}