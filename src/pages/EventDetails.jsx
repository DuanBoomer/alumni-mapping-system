import Button from "../components/Button";
import Header from "../components/Header";
import EventDetailsFlat from "../components/EventDetailsFlat";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";
import { useState } from "react";

export default function EventDetails() {

    const location = useLocation();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false)

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

    function handleJoinClick() {
        window.open(location.state.link);
        // window.open("https://calendar.google.com/calendar/u/0/r/eventedit?vcon=meet&dates=now&hl=enn")
    }

    function handleCancelClick() {
        axios.delete(`https://ams-backend-bdx5.onrender.com/delete/events/${localStorage.getItem("userID")}/${location.state.title}`)
        .then((response) => {
            navigate('/home')
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    function handleEditClick(){
        navigate("/home")
    }

    return (
        <div style={{ padding: "1em 1em 3em 1em" }}>

            <Header text={"Event Details"} />
            <EventDetailsFlat time={location.state.time} day={location.state.day} date={location.state.date} title={location.state.title} />

            <p style={styles.small_text}>{location.state.desc}</p>

            <div style={{ display: "flex", flexDirection: "column" }}>
                <Button text={"Join"} type={"light"} size={"big"} onClick={handleJoinClick} />
                <div>
                    <Button text={"Cancel"} type={"dark"} size={"big"} onClick={() => setShowModal(true)} />
                    <Button text={"Edit"} type={"dakr"} size={"big"} onClick={handleEditClick} />
                </div>
            </div>

            <Modal showModal={showModal} setShowModal={setShowModal}>
                <p>Are you sure you want to cancel this meeting?</p>
                <Button text={"yes"} type={"light"} size={"small"} onClick={handleCancelClick} />
                <Button text={"no"} type={"dark"} size={"small"} onClick={() => setShowModal(false)} />
            </Modal>

        </div>
    )
}