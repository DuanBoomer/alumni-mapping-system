import Header from "../components/Header";
import EventCard from "../components/EventCard";
import { useLocation } from "react-router-dom";
import { getEventsHistory } from "../back/Events";

export default function History() {

    const location = useLocation();
    const history = getEventsHistory(location.state.id)
    return (
        <div style={{ padding: "1em 1em 3em 1em" }}>
            <Header text={"History"} />
            {
                history.map((item) => {
                    return <EventCard time={`${item.start_time} to ${item.end_time}`} day={item.day} date={item.date} title={item.title} type="done" id={location.state.id} eventid={item.id} />
                })
            }
        </div>
    )
}