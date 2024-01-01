import { useState } from "react"
import Header from "../components/Header"
import InputField from "../components/InputField"
import Button from "../components/Button"

export default function ContactFaculty({ primaryUserData }) {
    const [message, setMessage] = useState("")
    const [subject, setSubject] = useState("")
    const styles = {
        big_text: {
            color: "#37352F",
            fontFamily: "Poppins",
            fontSize: "var(--font-size-xxl)",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "114%",
            letterSpacing: "-0.333px"
        },

        medium_text: {
            margin: "0",
            color: "#37352F",
            fontFamily: "Poppins",
            fontSize: "var(--font-size-md)",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "normal",
            letterSpacing: "-0.333px"
        },
    }

    function sendMessage() {

    }
    return (
        <div style={{ padding: "1em 1em 3em 1em" }}>
            <Header text={"Contact Faculty"} />
            <p style={styles.big_text}>{"John Wick"}</p>
            <InputField title="Subject" placeholder="subject" state={subject} setState={setSubject} />
            <InputField title="Message" placeholder="enter your message" type="textarea" rows={'10'} state={message} setState={setMessage} />
            <p style={styles.medium_text}>{"Yours Sincerely,"}</p>
            <p style={styles.medium_text}>{primaryUserData.name}</p>
            <Button text={"Send"} type={"dark"} size={"big"} onClick={sendMessage} />
        </div>
    )
}