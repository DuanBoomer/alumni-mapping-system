
export default function FormInputField({ title, register, placeholder, errors, label, regex, regexErrorMessage, type }) {

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
            margin: "0em 1em 0em 0em"
        },
        textarea: {
            padding: "1rem 2rem",
            marginBottom: "0.5em",
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
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
            <p style={styles.title}>{title}</p>
            {
                type === "image"
                    ? <input {...register(label, {
                        required: {
                            value: true,
                            message: `${label} is required`
                        }
                    })} accept="image/*" style={styles.input} type={"file"} />
                    : <input {...register(label, {
                        required: {
                            value: true,
                            message: `${label} is required`
                        },
                        pattern: {
                            value: regex,
                            message: regexErrorMessage
                        }
                    })} type={type} style={styles.input} placeholder={placeholder} />
            }

            <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'red' }}>{errors[label]?.message}</p>
        </div>
    )
}