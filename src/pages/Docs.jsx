import Header from "../components/Header";
import EventDetailsFlat from "../components/EventDetailsFlat";
import Doc from "../components/Doc";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Docs() {

    const location = useLocation()
    const [event, setEvent] = useState({ "docs": [] })

    useEffect(() => {
        axios.get(`https://ams-backend-bdx5.onrender.com/eventdetails/alumni/${localStorage.getItem("userID")}/${location.state.title}`)
            .then((response) => {
                setEvent(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    return (
        <div style={{ padding: "1em 1em 3em 1em" }}>
            <Header text={"Docs"} />
            <EventDetailsFlat time={`${event.start_time} to ${event.end_time}`} day={event.day} date={event.date} title={event.title} />

            {
                event.docs.map((item) => {
                    return <Doc text={item} />
                })
            }

        </div>
    )
}