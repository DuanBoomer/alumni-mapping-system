import arrow from "../assets/arrow.svg"
import star from "../assets/star.svg"
import { useNavigate } from "react-router-dom"

export default function ProfileCard({ data }) {

    const navigate = useNavigate()

    const styles = {
        profile_image: {
            height: "50px",
            width: "50px",
            objectFit: "cover",
            borderRadius: "10px",
        },

        card: {
            position: "relative",
            margin: "2em 0",
            width: "75%",
            padding: "1em",
            borderRadius: "18px",
            background: "var(--main-bg-color)",
            boxShadow: "-11px -11px 22px 0px var(--light-shadow), 11px 11px 22px 0px var(--dark-shadow)",
        },

        name: {
            margin: "0",
            padding: "0 0.5em",
            color: "var(--text-color-dark)",
            fontFamily: "Poppins",
            fontSize: "var(--font-size-lg)",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
            letterSpacing: "-0.333px",
        },

        text: {
            margin: "0",
            padding: "0",
            color: "var(--text-color-light)",
            fontFamily: "Poppins",
            fontSize: "var(--font-size-sm)",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
            letterSpacing: "-0.333px",
        }
    }

    function handleClick() {
        navigate("/details", {
            state: {
                data: data
            }
        })
    }

    return (
        <div style={styles.card} onClick={handleClick}>
            {data.name == data.student_coordinator ? <img src={star} alt="star" style={{ position: "absolute", top: "1em", right: "1em", margin: "0", padding: "0", width: "18px", height: "18px" }} /> : <></>}

            <div style={{ display: "flex", alignItems: "flex-end" }}>
                <img style={styles.profile_image} src={data.image} alt="profile image" />
                <p style={styles.name}>{data.name}</p>
            </div>

            <div style={{ margin: "5px" }}>
                {
                    data.expertise
                        ? <div>
                            <p style={styles.text}>{data.expertise.join(" | ")}</p>
                            <p style={styles.text}>{data.position}</p>

                        </div>
                        : <div>
                            <p style={styles.text}>{data.roll_no}</p>
                        </div>
                }

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                    {
                        data.company
                            ? <p style={styles.text}>{data.company}</p>
                            : <p style={styles.text}>{`${data.course} ${data.stream}`}</p>
                    }

                    <div>
                        <img src={arrow} alt="" />
                        <img src={arrow} alt="" />
                    </div>
                </div>

            </div>

        </div>
    )
}