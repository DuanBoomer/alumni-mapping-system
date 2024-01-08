import { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import arrow from "../assets/arrow.svg";
import copy from "../assets/copy-icon.svg";
import bin from "../assets/delete-icon.svg";
import back_button from "../assets/back-button.svg"
import { useNavigate } from "react-router-dom";
import useLongPress from "../hooks/useLongPress";

function ChatBox({ text, profile_image, type, socket, sender, alumni }) {
  const { action, handlers } = useLongPress({
    onClick: chatOnClick,
    onLongPress: chatOnLongPress
  })
  const [showModal, setShowModal] = useState(false)
  let menuRef = useRef(null)

  useEffect(() => {
    let handler = (e) => {
      if(!menuRef.current?.contains(e.target)){
        setShowModal(false)
      }
    }

    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })

  const styles = {
    profile_image: {
      height: "40px",
      width: "40px",
      objectFit: "cover",
      borderRadius: "10px",
    },

    text: {
      border: "none",
      padding: '1em',
      userSelect: "none",
      textAlign: "right",
      margin: "0",
      color: "var(text-color-light)",
      fontSize: "var(--font-size-sm)",
      borderRadius: type === "sent" ? "18px 18px 0px 18px" : "18px 18px 18px 0px",
      background: "var(--main-bg-color)",
      boxShadow: "-5px -5px 10px 0px var(--light-shadow) inset, 5px 5px 10px 0px var(--dark-shadow) inset",
    },

    div: {
      position: "relative",
      display: "flex",
      justifyContent: type === "sent" ? "end" : "start",
      alignItems: "end",
      gap: '0.75em',
      margin: "0.75em 1em 0.75em 0em",
      wordBreak: "break-word",
    },

    modal: {
      position: 'absolute',
      top: "2em",
      zIndex: 2,
      padding: "1em",
      borderRadius: "18px",
      background: "var(--main-bg-color)",
      boxShadow: "-5px -5px 10px 0px var(--light-shadow) inset, 5px 5px 10px 0px var(--dark-shadow) inset",
    },

    modalButton: {
      display: 'flex',
      alignItems: 'center',
      gap: "10px",
      background: 'none',
      border: 'none',
      // textDecoration: "underline",
    }
  }

  function chatOnClick() {
    console.log("click");
  }

  function chatOnLongPress() {
    setShowModal(true)
    console.log("long press");
  }

  function chatDelete() {
    socket.emit("msgdelete", text, sender, alumni)
    console.log('del click');
    setShowModal(false)
  }

  function chatCopy() {
    navigator.clipboard.writeText(text);
    setShowModal(false)
  }

  return (
    <div style={styles.div} >
      {
        type === "sent"
          ? <>
            <button {...handlers} style={styles.text}>{text}</button>
            <img style={styles.profile_image} src={profile_image} alt="profile" />
          </>

          : <>
            <img style={styles.profile_image} src={profile_image} alt="profile" />
            <button {...handlers} style={styles.text}>{text}</button>
          </>
      }

      {
        showModal
          ? <div style={styles.modal} ref={menuRef} >
            {type === 'sent' ? <button onClick={chatDelete} style={styles.modalButton}><img src={bin} />delete</button> : <></>}
            <button onClick={chatCopy} style={styles.modalButton}> <img src={copy} />copy</button>
          </div>
          : <></>
      }
    </div>
  )
}

export default function Chat({ socket, chatData, setChatData, primaryUserData, alumniData, studentsData }) {

  const navigate = useNavigate();
  const btn = useRef(null)
  const chatEndDiv = useRef(null)

  const [chatInput, setChatInput] = useState("")

  const styles = {
    chat: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      // height: "80vh",
      height: "calc(100vh - 2*75px - 20px - 60px - 25px)", // total height - twice header height - bottom offset -browser offset -back button size
      borderRadius: "18px",
      padding: "1em",
      background: "var(--main-bg-color)",
      boxShadow: "-8px -8px 16px 0px var(--light-shadow), 8px 8px 16px 0px var(--dark-shadow)",
    },

    input: {
      color: "var(--test-color-light)",
      verticalAlign: "middle",
      background: "var(--main-bg-color)",
      fontFamily: "Poppins",
      fontSize: "var(--font-size-sm)",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "normal",
      border: "none",
      outline: "none",
      width: "100%",
      borderBottom: "2px solid var(--text-color-light)"
    },

    send_icon: {
      width: "var(--font-size-sm)"
    }
  }

  function handleSendClick() {
    if (chatInput && chatInput.replace(/\s/g, '').length && socket) {
      socket.emit('msg', chatInput, primaryUserData.email, alumniData.email)
      console.log('chat emit');
      setChatInput("")
    }
  }

  useEffect(() => {
    chatEndDiv.current?.scrollIntoView()
  }, [chatData])

  return (

    <div style={{ padding: "1em" }}>
      <div style={{ display: "flex", cursor: "pointer", zIndex: "2", position: "relative" }}
        onClick={() =>
          navigate('/home')}>
        <img
          style={{ width: "20px", marginRight: "5px" }}
          src={back_button}
          alt="go back" />
        <p style={{ margin: 0, padding: 0 }}>back</p>
      </div>
      <Header text={"Chat"} />

      <div style={styles.chat}>
        <div style={{ height: "100%", overflowY: 'scroll' }}>
          {
            chatData.map((chat, index) => {
              var profile_pic;
              profile_pic = studentsData.find((item) => item.email === chat.sender)

              if (profile_pic) {
                profile_pic = profile_pic.image
              }
              else {
                profile_pic = alumniData.image
              }
              return <ChatBox
                key={index}
                socket={socket}
                text={chat.text}
                sender={chat.sender}
                alumni={primaryUserData.alumni ? primaryUserData.alumni : primaryUserData.email}
                profile_image={profile_pic}
                type={primaryUserData.email === chat.sender ? "sent" : "recieved"}
              />
            })
          }
          <div ref={chatEndDiv}></div>

        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1em", padding: "1em 0 0 0" }}>

          <input
            style={styles.input}
            placeholder="Type a message"
            value={chatInput}
            onKeyDown={(e) => e.key === "Enter" ? btn.current.click() : {}}
            onChange={(event) => { setChatInput(event.target.value) }} />

          <button ref={btn} style={{ display: "flex", background: "none", border: "none" }} onClick={handleSendClick} >
            <img style={styles.send_icon} src={arrow} alt="" />
            <img style={styles.send_icon} src={arrow} alt="" />
          </button>

        </div>
      </div>
    </div>
  );
}
