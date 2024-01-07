import Button from "../components/Button";
import Header from "../components/Header";
import EventDetailsFlat from "../components/EventDetailsFlat";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";
import { useState } from "react";
import { API_BASE } from "../App";

export default function EventDetails({ setEventsData, primaryUserData }) {

    const location = useLocation();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false)

    const alumni = location.state.alumni
    const eventData = location.state.eventData

    function handleCancelClick() {
        axios.delete(`${API_BASE}/delete/event/${alumni}/${eventData.title}`)
            .then((response) => {
                navigate('/home')
            })
            .catch((error) => {
                // console.log(error);
            })
    }

    function handleMarkAsDoneClick(){
        axios.put(`${API_BASE}/update/event/${alumni}/${eventData.title}`,
            {
                ...eventData,
                type: "done"
            }
        ).then((response) => {
            navigate("/home")
        }).catch((error) => {
            // console.log(error);
        })
    }

    function handleEditClick() {
        navigate("/schedulemeet", { state: eventData })
    }

    return (
        <div style={{ padding: "1em 1em 3em 1em" }}>

            <Header text={"Event Details"} />
            <EventDetailsFlat eventData={eventData} />

            <div style={{ display: "flex", flexDirection: "column" }}>
                {
                    primaryUserData.alumni
                        ? <></>
                        : <div>
                            <Button text={"Cancel"} type={"dark"} size={"big"} onClick={() => setShowModal(true)} />
                            <Button text={"Edit"} type={"dark"} size={"big"} onClick={handleEditClick} />
                            <Button text={"Mark as done"} type={"dark"} size={"big"} onClick={handleMarkAsDoneClick} />
                        </div>
                }

            </div>

            <Modal showModal={showModal} setShowModal={setShowModal}>
                <p>Are you sure you want to cancel this meeting?</p>
                <Button text={"yes"} type={"light"} size={"small"} onClick={handleCancelClick} />
                <Button text={"no"} type={"dark"} size={"small"} onClick={() => setShowModal(false)} />
            </Modal>

        </div>
    )
}