import close_icon from "../assets/close.svg"
export default function Modal({ children, showModal, setShowModal }) {
    const styles = {
        modal: {
            backgroundColor: "var(--main-bg-color)",
            position: "fixed",
            top: "50%",
            left: "50%",
            width: "80vw",
            transform: "translate(-50%, -50%)",
            borderRadius: "18px",
            padding: "1em",
        },
        backdrop: {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(55, 53, 47, 0.80)",
        },
        closeButton: {
            position: "absolute",
            right: "10px",
            top: "10px",
            // width: "px",
            background: "none",
            color: "inherit",
            border: "none",
            padding: "0",
            font: "inherit",
            cursor: "pointer",
            outline: "inherit",
        }
    }

    return (
        <div>
            {
                showModal
                    ? <div>
                        <div style={styles.backdrop}></div>
                        <div style={styles.modal}>
                            <button style={styles.closeButton} onClick={() => setShowModal(false)}>
                                <img style={{ width: "20px" }} src={close_icon} />
                            </button>
                            {children}
                        </div>
                    </div>
                    : <></>
            }
        </div>

    )
}