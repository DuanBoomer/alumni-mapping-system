import Header from "../components/Header";
import profile_image from "../assets/person.jpeg"
import Button from "../components/Button";
import InputField from "../components/InputField";

import { useLocation } from "react-router-dom";
import { getAlumniDetails } from "../back/User";
import { useState } from "react";

export default function EditProfile() {

    const location = useLocation()
    const alumni = getAlumniDetails(location.state.id)

    const [alumniData, setAlumniData] = useState(alumni)

    const styles = {
        profile_image: {
            height: "180px",
            borderRadius: "10px",
        },

        long_input: {
            cols:"10rem",
            padding: "1rem 2rem",
            width: "50%",
            border: "none",
            outline: "none",
            margin: "0 0 0.5em 0.5em",
            color: "var(--text-color-light)",
            fontFamily: "Poppins",
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "normal",
            borderRadius: "13px",
            background: "var(--main-bg-color)",
            boxShadow: "-5px -5px 10px 0px var(--light-shadow) inset, 5px 5px 10px 0px var(--dark-shadow) inset"
        }
    }
    return (
        <div style={{ padding: "1em 1em 3em 1em" }}>
            <Header text={"Edit Profile"} />

            <div style={{ display: "flex", alignItems: "flex-start" }}>

                <div>
                    <img style={styles.profile_image} src={profile_image} alt="profile"/>
                    <Button text={"Upload"} type={"dark"} size={"big"} />
                </div>

                <div>
                    <input style={styles.long_input} value={alumniData.name} onChange={(event) => setAlumniData({...alumniData, name: event.target.value})} placeholder={"name"} />
                    <textarea style={styles.long_input} value={alumniData.desc} onChange={(event) => setAlumniData({ ...alumniData, desc: event.target.value })} rows={'3'} placeholder="desc"/>
                </div>
            </div>

            <InputField title={"Email"} placeholder={"enter your email"} state={alumniData.email} setState={(val) => setAlumniData({ ...alumniData, email: val })}/>
            <InputField title={"Company Name"} placeholder={"where you work?"} state={alumniData.company} setState={(val) => setAlumniData({ ...alumniData, company: val })} />
            <InputField title={"Expertise"} placeholder={"enter everything you love"} state={alumniData.expertise.join(",")} setState={(val) => setAlumniData({ ...alumniData, expertise: val.split(",") })} />
            
        </div>
    )
}