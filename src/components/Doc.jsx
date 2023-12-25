import download from "../assets/download.svg"

export default function Doc({text}){

    const styles = {
        text: {
            color: "#5B574E",
            margin: "0",
            fontFamily: "Poppins",
            fontSize: "var(--font-size-sm)",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "normal",
        },

        div: {
            display: "flex",
            justifyContent: "space-between",
            padding: "0.75em 1.25em",
            margin: "1em 0em",
            borderRadius: "18px",
            background: "#E0E0E0",
            boxShadow: "-4px -4px 8px 0px #FFF, 4px 4px 8px 0px #BEBEBE",
        },

        download_icon: {
            width: "var(--font-size-sm)"
        }
    }

    return (
        <div style={styles.div}>
            <p style={styles.text}>{text}</p>
            <img style={styles.download_icon} src={download}/>
        </div>
    )
}