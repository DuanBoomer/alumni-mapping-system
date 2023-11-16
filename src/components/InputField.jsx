import eye_opened from "../assets/eye-opened.svg"
import eye_closed from "../assets/eye-closed.svg"

import { useState } from "react"

export default function InputField({ title, placeholder, type, state, setState }) {

    const [passwordShown, setPasswordShown] = useState(false)

    const styles = {
        input: {
            padding: "1rem 2rem",
            border: "none",
            outline: "none",
            marginBottom: "0.5em",
            color: "var(--text-color-light)",
            fontFamily: "Poppins",
            fontSize: "var(--font-size-sm)",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "normal",
            borderRadius: "13px",
            background: "var(--main-bg-color)",
            boxShadow: "-5px -5px 10px 0px var(--light-shadow) inset, 5px 5px 10px 0px var(--dark-shadow) inset",
        },

        title: {
            color: "var(--text-color-light)",
            fontFamily: "Poppins",
            fontSize: "var(--font-size-md)",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "normal",
            margin: "0em"
        },

        icon: {
            width: "var(--font-size-md)",
            position: "absolute",
            right: "15px",
            bottom: "calc(50% - var(--font-size-md))" // half width - title size

        },
        textarea: {
            padding: "1rem 2rem",
            marginBottom: "0.5em",
            // padding: "0.75rem 1.25rem",
            border: "none",
            outline: "none",
            color: "var(--text-color-light)",
            fontFamily: "Poppins",
            fontSize: "var(--font-size-sm)",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "normal",
            borderRadius: "13px",
            background: "var(--main-bg-color)",
            boxShadow: "-5px -5px 10px 0px var(--light-shadow) inset, 5px 5px 10px 0px var(--dark-shadow) inset"
        }
    }

    function togglePassword() {
        setPasswordShown(!passwordShown)
    }

    var InputTag;

    switch (type) {
        case "textarea":
            InputTag = <textarea style={styles.textarea} rows={'4'} placeholder="desc" />
            break;

        case "password":
            InputTag = <input style={styles.input} placeholder={placeholder} type={passwordShown ? "text" : "password"} value={state} onChange={(event) => setState(event.target.value)} />
            break;

        case "email":
            InputTag = <input style={styles.input} placeholder={placeholder} type={"email"} value={state} onChange={(event) => setState(event.target.value.toLowerCase())} />
            break;

        case "date":
            InputTag = <input style={styles.input} type={"date"} value={state} onChange={(event) => setState(event.target.value)} />
            break;

        case "time":
            InputTag = <input style={styles.input} type={"time"} value={state} onChange={(event) => setState(event.target.value)} />
            break;

        case "url":
            InputTag = <input style={styles.input} placeholder={placeholder} type={"url"} value={state} onChange={(event) => setState(event.target.value)} />
            break;

        case "file":
            InputTag = <input style={styles.input} type={"file"} onChange={(event) => setState(event.target.value)} />
            break;

        default:
            InputTag = <input style={styles.input} placeholder={placeholder} type={"text"} value={state} onChange={(event) => setState(event.target.value)} />
            break;
    }


    return (
        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
            <p style={styles.title}>{title}</p>

            {InputTag}

            {
                type === "password"
                    ? <img onClick={togglePassword} style={styles.icon} src={passwordShown ? eye_opened : eye_closed} alt="show password" />
                    : <></>
            }
        </div>
    )
}