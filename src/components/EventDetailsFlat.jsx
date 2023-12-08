export default function EventDetailsFlat({ eventData }) {

    const styles = {
        big_text: {
            color: "#37352F",
            fontFamily: "Poppins",
            fontSize: "var(--font-size-lg)",
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
    return (
        <div>
            {/* <Header text={"Event Details"} /> */}
            <p style={styles.big_text}>{eventData.title}</p>

            <div style={{ margin: "1.5em 0" }}>
                <p style={styles.medium_text}>{eventData.time}</p>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p style={styles.medium_text}>{eventData.day}</p>
                    <p style={styles.medium_text}>{eventData.date}</p>
                </div>
            </div>
        </div>
    )
}