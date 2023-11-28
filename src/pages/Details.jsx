import Header from "../components/Header";
import OutputField from "../components/OutputField";
import person from "../assets/person.jpeg"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Details() {

    const location = useLocation()
    const [personData, setPersonData] = useState({ "expertise": [] });

    console.log(personData);

    useEffect(() => {
        axios.get(`https://ams-backend-bdx5.onrender.com/${location.state.type}/${location.state.id}`)
            .then((response) => {
                setPersonData(response.data)
            })
    }, [])

    const styles = {
        profile_image: {
            width: "179px",
            borderRadius: "10px",
        },

        name: {
            margin: "0.5em 0",
            color: "#37352F",
            fontFamily: "Poppins",
            fontSize: "var(--font-size-xxl)",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "30px",
            letterSpacing: "-0.333px",
        },

        desc: {
            margin: "0",
            color: "#5B574E",
            fontFamily: "Poppins",
            fontSize: "var(--font-size-md)",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "105%",
        }
    }

    return (
        <div style={{ padding: "1em 1em 3em 1em" }}>
            <Header text={"Details"} />

            <div style={{ display: "flex", alignItems: "flex-end", gap: "0.5em", marginBottom: "2em" }}>
                <img style={styles.profile_image} src={person} alt="profile" />
                <div>
                    <p style={styles.name}>{personData.name}</p>
                    <p style={styles.desc}>{personData.desc}</p>
                </div>
            </div>

            {
                location.state.type === "alumni"
                    ? <div>
                        <OutputField text={personData.email} title={"Email"} />
                        <OutputField text={personData.position} title={"Position"} />
                        <OutputField text={personData.company} title={"Company Name"} />
                        <OutputField text={personData.expertise.join(', ')} title={"Expertise"} />
                        <OutputField text={personData.batch} title={"Batch"} />
                    </div>

                    : <div>
                        <OutputField text={personData.email} title={"Email"} />
                        <OutputField text={personData.course + " " + personData.stream} title={"Course"} />
                        <OutputField text={personData.roll_no} title={"Roll Number"} />
                    </div>
            }

            <div style={{ height: "calc(0.5em + 26px)" }}></div>


        </div>
    )
}