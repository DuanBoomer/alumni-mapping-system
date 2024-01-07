import Header from "../components/Header";
import EventCard from "../components/EventCard";
export default function History({ eventsData }) {
    const styles = {
        text: {
            margin: "0",
            padding: "0 0.5em",
            color: "var(--text-color-dark)",
            fontFamily: "Poppins",
            fontSize: "var(--font-size-xl)",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
            letterSpacing: "-0.333px",
        }
    }

    return (
        <div style={{ padding: "1em 1em 3em 1em" }}>
            <Header text={"History"} />
            {
                eventsData.done.length === 0 && eventsData.pending.length === 0
                    ? <div>
                        <p>No events ever</p>
                    </div>
                    : <div>
                        <p style={styles.text}>Pending</p>
                        {
                            eventsData.pending.map((item, index) => {
                                return <EventCard key={index} eventData={{ ...item, type: "done" }} />
                            })
                        }

                        <p style={styles.text}>Done</p>
                        {
                            eventsData.done.map((item, index) => {
                                return <EventCard key={index} eventData={item} />
                            })
                        }
                    </div>
            }

        </div>
    )
}