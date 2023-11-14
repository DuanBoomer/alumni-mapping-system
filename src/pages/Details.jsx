import Header from "../components/Header";
import OutputField from "../components/OutputField";
import person from "../assets/person.jpeg"



// webpack compiled with 1 warning
// One of your dependencies, babel - preset - react - app, is importing the
// "@babel/plugin-proposal-private-property-in-object" package without
// declaring it in its dependencies.This is currently working because
// "@babel/plugin-proposal-private-property-in-object" is already in your
// node_modules folder for unrelated reasons, but it may break at any time.

//     babel - preset - react - app is part of the create - react - app project, which
// is not maintianed anymore.It is thus unlikely that this bug will
// ever be fixed.Add "@babel/plugin-proposal-private-property-in-object" to
// your devDependencies to work around this error.This will make this message
// go away.

export default function Details() {
    const styles = {
        profile_image: {
            width: "179px",
            borderRadius: "10px",
        },

        name: {
            margin: "0.5em 0",
            color: "#37352F",
            fontFamily: "Poppins",
            fontSize: "28px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "normal"
        },

        desc: {
            margin: "0",
            color: "#5B574E",
            fontFamily: "Poppins",
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "105%",
        }
    }

    return (
        <div style={{ padding: "1em 1em 3em 1em" }}>
            <Header text={"Details"} />

            <div style={{ display: "flex", alignItems: "flex-end", gap: "0.5em", marginBottom: "2em" }}>
                <img style={styles.profile_image} src={person} />
                <div>
                    <p style={styles.name}>Chirag</p>
                    <p style={styles.desc}>Blockchain and AI Expert, Currently working at Wipro</p>
                </div>
            </div>
            <OutputField text={"chirag@wipro.org"} title={"Email"} />
            <OutputField text={"Wipro.inc"} title={"Company Name"} />
            <OutputField text={"AI, Blockchain"} title={"Expertise"} />
        </div>
    )
}