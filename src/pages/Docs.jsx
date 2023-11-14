import Header from "../components/Header";
import EventDetailsFlat from "../components/EventDetailsFlat";
import Doc from "../components/Doc";

import { useLocation } from "react-router-dom";
import { getEvent } from "../back/Events";

export default function Docs() {

    const location = useLocation()
    const event = getEvent(location.state.id, location.state.eventid)

    console.log(event);

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