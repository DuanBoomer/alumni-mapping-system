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

        }
    }

    function togglePassword() {
        setPasswordShown(!passwordShown)
    }
    return (
        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
            <p style={styles.title}>{title}</p>
            <input
                style={styles.input}
                placeholder={placeholder}
                type={
                    type === "password"
                        ? passwordShown
                            ? "password"
                            : "text"
                        : "text"
                }
                value={state}
                onChange={(event) => {
                    setState(
                        type === "password"
                            ? event.target.value
                            : event.target.value.toLowerCase()
                    )
                }} />
            {
                type === "password"
                    ? <img onClick={togglePassword} style={styles.icon} src={passwordShown ? eye_opened : eye_closed} alt="show password"/>
                    : <></>
            }
        </div>
    )
}