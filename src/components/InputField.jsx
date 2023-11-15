export default function InputField({ title, placeholder, type, state, setState }) {

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
        }
    }
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <p style={styles.title}>{title}</p>
            <input style={styles.input} placeholder={placeholder} type={type} value={state} onChange={(event) => { setState(event.target.value) }} />
        </div>
    )
}