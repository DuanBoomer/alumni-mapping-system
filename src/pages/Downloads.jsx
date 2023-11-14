import Header from "../components/Header";
import Doc from "../components/Doc";

export default function Downloads() {

  const styles = {
    date: {
      color: "#37352F",
      fontFamily: "Poppins",
      fontSize: "24px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "normal",
      letterSpacing: "-0.333px",
    }
  }
  return (
    <div style={{ padding: "1em 1em 3em 1em" }}>
      <Header text={"Download"} />
      <p style={styles.date}>20 aug 2023</p>
      <Doc text={"sample-resume.pdf"} />
      <Doc text={"job-market-analysis.pdf"} />
      <Doc text={"interview-questions.pdf"} />
      <p style={styles.date}>22 aug 2023</p>
      <Doc text={"technical-industry-map.pdf"} />
    </div>
  )
}