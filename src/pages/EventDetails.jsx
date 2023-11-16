import Button from "../components/Button";
import Header from "../components/Header";
import EventDetailsFlat from "../components/EventDetailsFlat";
import { useLocation, useNavigate } from "react-router-dom";

export default function EventDetails({id}) {

    const location = useLocation();
    const navigate = useNavigate();

    const styles = {
        small_text: {
            margin: "1em 0",
            color: "#5B574E",
            fontFamily: "Poppins",
            fontSize: "var(--font-size-sm)",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "87%",
        }
    }

    function handleJoinClick(){
        window.open("https://calendar.google.com/calendar/u/0/r/eventedit?vcon=meet&dates=now&hl=enn")
    }

    function handleCancelClick(){
        navigate('/home')
    }
    return (
        <div style={{ padding: "1em 1em 3em 1em" }}>

            <Header text={"Event Details"} />
            <EventDetailsFlat time={location.state.time} day={location.state.day} date={location.state.date} title={location.state.title}/>

            <p style={styles.small_text}>{location.state.desc}</p>

            <div style={{display: "flex", flexDirection: "column"}}>
                <Button text={"Join"} type={"light"} size={"big"} onClick={handleJoinClick}/>
                <Button text={"Cancel"} type={"dark"} size={"big"} onClick={handleCancelClick}/>
            </div>

        </div>
    )
}