import Header from "../components/Header";
import InputField from "../components/InputField";
import { useState } from "react";

export default function ScheduleMeet() {

    const [time, setTime] = useState("")
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [date, setDate] = useState("")
    const [link, setLink] = useState("")

    //  onChange={(event) => setAlumniData({ ...alumniData, desc: event.target.value })} , value={alumniData.desc}

    return (
        <div style={{ padding: "1em 1em 3em 1em" }}>

            <Header text={"Schedule Meet"} />
            <InputField title={"Title"} placeholder={"enter a title"} type={"text"} state={title} setState={setTitle} />
            <InputField title={"Description"} placeholder={"enter a desc"} type={"textarea"} state={desc} setState={setDesc} />
            <InputField title={"Time"} placeholder={"time"} type={"time"} state={time} setState={setTime} />
            <InputField title={"Date"} placeholder={"date"} type={"date"} state={date} setState={setDate} />
            <InputField title={"Link"} placeholder={"meet link"} type={"url"} state={link} setState={setLink} />

            <div style={{ height: "calc(0.5em + 26px)" }}></div>
        </div>
    )
}