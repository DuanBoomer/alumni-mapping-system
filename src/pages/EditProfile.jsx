import Header from "../components/Header";
import profile_image from "../assets/person.jpeg"
import Button from "../components/Button";
import InputField from "../components/InputField";
import OutputField from "../components/OutputField"
import Modal from "../components/Modal";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function EditProfile() {

    const navigate = useNavigate()
    const [alumniData, setAlumniData] = useState({ "expertise": [] })
    // const [image, setImage] = useState("")
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("studentID")) {
            axios.get(`https://ams-backend-bdx5.onrender.com/student/${localStorage.getItem("studentID")}`)
                .then((response) => {
                    console.log(response.data);
                    setAlumniData(response.data)
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        else {
            axios.get(`https://ams-backend-bdx5.onrender.com/alumni/${localStorage.getItem("userID")}`)
                .then((response) => {
                    setAlumniData(response.data)
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [])


    const styles = {
        profile_image: {
            width: "100%",
            minWidth: "100px",
            borderRadius: "10px",
        },

        long_input: {
            flexGrow: 1,
            flexBasis: 0,
            flexShrink: 0,

            padding: "1rem 2rem",
            width: "calc(100% - 4.5em)",

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
        },
        partition: {
            flexGrow: 1,
            flexBasis: 0,
            flexShrink: 0,
            gap: "0.5em",

            display: "flex",
            flexDirection: "column",
        },
    }

    function handleSubmitClick() {
        if (localStorage.getItem("studentID")) {
            navigate("/profile")
        }
        else {
            axios.post(`https://ams-backend-bdx5.onrender.com/update/alumni/${localStorage.getItem("userID")}`,
                alumniData
            ).then((response) => {
                console.log(response);
                navigate("/profile")
                // setAlumniData(response.data)
            })
                .catch((error) => {
                    console.log(error);
                })
        }
        // handleImageUpload()
    }

    return (
        <div style={{ padding: "1em 1em 3em 1em" }}>
            <Header text={"Edit Profile"} />

            <div style={{ display: "flex", gap: "0.5em", marginBottom: "1em" }}>

                <div style={styles.partition}>
                    <img style={styles.profile_image} src={alumniData.image} alt="profile" />

                </div>

                <div style={styles.partition}>
                    <input style={{ ...styles.long_input }} value={alumniData.name} onChange={(event) => setAlumniData({ ...alumniData, name: event.target.value })} placeholder={"name"} />
                    <textarea style={styles.long_input} value={alumniData.desc} onChange={(event) => setAlumniData({ ...alumniData, desc: event.target.value })} rows={'3'} placeholder="desc" />
                </div>
            </div>

            {/* <Button text={"Upload"} type={"dark"} size={"small"} onClick={() => handleImageUpload("/editprofile")} /> */}
            <InputField title={""} placeholder={"profile picture"} type={"file"} state={alumniData.image} setState={(val) => setAlumniData({ ...alumniData, image: val })} />

            <OutputField title={"Email"} text={alumniData.email} />
            {/* <InputField title={"Password"} placeholder={"something secret"} state={"********"} /> */}

            <InputField title={"Company Name"} placeholder={"where you work?"} state={alumniData.company} setState={(val) => setAlumniData({ ...alumniData, company: val })} />
            {/* <InputField title={"Expertise"} placeholder={"enter everything you love"} state={alumniData.expertise.join(",")} setState={(val) => setAlumniData({ ...alumniData, expertise: val.split(",") })} /> */}

            <Button text={"Submit"} type={"light"} size={"big"} onClick={() => setShowModal(true)} />

            <Modal showModal={showModal} setShowModal={setShowModal}>
                <p>Are you sure you want to save these changes?</p>
                <Button text={"yes"} type={"light"} size={"small"} onClick={handleSubmitClick} />
                <Button text={"no"} type={"dark"} size={"small"} onClick={() => setShowModal(false)} />
            </Modal>

            <div style={{ height: "calc(0.5em + 26px)" }}></div>

        </div>
    )
}