import Header from "../components/Header";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ScheduleMeet({id}) {

    const navigate = useNavigate()

    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [date, setDate] = useState("")
    const [link, setLink] = useState("")

    return (
        <div style={{ padding: "1em 1em 3em 1em" }}>

            <Header text={"Schedule Meet"} />
            <InputField title={"Title"} placeholder={"enter a title"} type={"text"} state={title} setState={setTitle} />
            <InputField title={"Description"} placeholder={"enter a desc"} type={"textarea"} state={desc} setState={setDesc} />
            <InputField title={"Start Time"} type={"time"} state={startTime} setState={setStartTime} />
            <InputField title={"End Time"} type={"time"} state={endTime} setState={setEndTime} />
            <InputField title={"Date"} type={"date"} state={date} setState={setDate} />
            <InputField title={"Link"} placeholder={"meet link"} type={"url"} state={link} setState={setLink} />

            <Button text={"Schedule"} type={"light"} size={"big"} onClick={() => navigate("/home")} />

            <div style={{ height: "calc(0.5em + 26px)" }}></div>
        </div>
    )
}