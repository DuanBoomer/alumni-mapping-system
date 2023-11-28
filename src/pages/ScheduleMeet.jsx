import Header from "../components/Header";
import InputField from "../components/InputField";
import OutputField from "../components/OutputField"
import Button from "../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ScheduleMeet() {

    const navigate = useNavigate()

    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [date, setDate] = useState("")
    const [link, setLink] = useState("")

    function day_of_week(date) {
        var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var date = new Date(date)
        return weekday[date.getUTCDay()]
    }

    function handleSubmitClick(){
        axios.post(`https://ams-backend-bdx5.onrender.com/schedule_event/alumni/${localStorage.getItem("userID")}`, 
        {
            title: title,
            start_time: startTime,
            end_time: endTime,
            day: day_of_week(date),
            date: date,
            desc: desc,
            link: link,
            type: "pending",
            docs: []
        }
        ).then((response) => {
            console.log(response);
            navigate("/home")
        }).catch((error) => {
            console.log(error);
        })
    }

    function get_meet_link(){
        window.open("https://meet.google.com/")
    }

    return (
        <div style={{ padding: "1em 1em 3em 1em" }}>

            <Header text={"Schedule Meet"} />
            <InputField title={"Title"} placeholder={"enter a title"} type={"text"} state={title} setState={setTitle} />
            <InputField title={"Description"} placeholder={"enter a desc"} type={"textarea"} state={desc} setState={setDesc} />
            <InputField title={"Start Time"} placeholder={"start time"} type={"time"} state={startTime} setState={setStartTime} />
            <InputField title={"End Time"} placeholder={"end time"} type={"time"} state={endTime} setState={setEndTime} />
            <InputField title={"Date"} placeholder={"date"} type={"date"} state={date} setState={setDate} />

            <OutputField title={"Day"} text={day_of_week(date) ? day_of_week(date): "choose a date"} />
            <InputField title={"Link"} placeholder={"meet link"} type={"url"} state={link} setState={setLink} button={<Button text={"get link"} type={"dark"} size={"small"} onClick={get_meet_link}/>} />

            <Button text={"Schedule"} type={"light"} size={"big"} onClick={handleSubmitClick} />

            <div style={{ height: "calc(0.5em + 26px)" }}></div>
        </div>
    )
}