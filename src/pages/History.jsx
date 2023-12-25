import Header from "../components/Header";
import EventCard from "../components/EventCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
export default function History({ eventsData }) {
    // const location = useLocation();
    // const {history} = location.state
    // const [history, setHistory] = useState({"pending": [], "done": []})

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
        }
    }

    // useEffect(() => {
    //     axios.get(`https://ams-backend-bdx5.onrender.com/events/alumni/${localStorage.getItem("userID")}`)
    //         .then((response) => {
    //             setHistory(response.data)
    //         })
    //         .catch((error) => {
    //             // console.log(error);
    //         })
    // }, [])

    // // console.log(history);

    return (
        <div style={{ padding: "1em 1em 3em 1em" }}>
            <Header text={"History"} />
            <p style={styles.text}>Pending</p>
            {
                eventsData.pending.map((item, index) => {
                    return <EventCard key={index} eventData={{ ...item, type: "done" }} />
                })
            }

            <p style={styles.text}>Done</p>
            {
                eventsData.done.map((item, index) => {
                    return <EventCard key={index} eventData={item} />
                })
            }
        </div>
    )
}