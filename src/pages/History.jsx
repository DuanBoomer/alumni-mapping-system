import Header from "../components/Header";
import EventCard from "../components/EventCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function History() {

    const [history, setHistory] = useState([])
    console.log(history);

    useEffect(() => {
        axios.get(`https://ams-backend-bdx5.onrender.com/events/alumni/${localStorage.getItem("userID")}`)
            .then((response) => {
                setHistory(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    return (
        <div style={{ padding: "1em 1em 3em 1em" }}>
            <Header text={"History"} />
            {
                history.map((item) => {
                    return <EventCard time={`${item.start_time} to ${item.end_time}`} day={item.day} date={item.date} title={item.title} type="done" />
                })
            }
        </div>
    )
}