import { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import profile_image from "../assets/person.jpeg";
import arrow from "../assets/arrow.svg";
import back_button from "../assets/back-button.svg"
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../App";

// import { socket } from "../socket";
import axios from "axios";

function ChatBox({ text, profile_image, type }) {
  const styles = {
    profile_image: {
      height: "40px",
      width: "40px",
      objectFit: "cover",
      borderRadius: "10px",
    },

    text: {
      padding: '1em',
      margin: "0",
      fontSize: "var(--font-size-sm)",
      borderRadius: type === "sent" ? "18px 18px 0px 18px" : "18px 18px 18px 0px",
      background: "#E0E0E0",
      boxShadow: "-5px -5px 10px 0px #FFF inset, 5px 5px 10px 0px #BEBEBE inset",
    },

    div: {
      display: "flex",
      justifyContent: type === "sent" ? "end" : "start",
      alignItems: "end",
      gap: '0.75em',
      margin: "0.75em 1em 0.75em 0em",
      wordBreak: "break-word",
    }
  }

  return (
    <div style={styles.div}>
      {
        type === "sent"
          ? <>
            <p style={styles.text}>{text}</p>
            <img style={styles.profile_image} src={profile_image} alt="profile" />
          </>

          : <>
            <img style={styles.profile_image} src={profile_image} alt="profile" />
            <p style={styles.text}>{text}</p>
          </>
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
      background: "#E0E0E0",
      boxShadow: "-8px -8px 16px 0px #FFF, 8px 8px 16px 0px #BEBEBE",

      // position: "absolute",
      // bottom: "1000px",
      // top: "0",
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

      // wordWrap: "break-word",

      width: "100%",
      borderBottom: "2px solid var(--text-color-light)"
      // padding: "1em 1em 0 0",
    },

    send_icon: {
      width: "var(--font-size-sm)"
    }
  }

  function handleSendClick() {
    // console.log(chatInput)
    if (chatInput && chatInput.replace(/\s/g, '').length && socket) {
      socket.emit('msg', chatInput, primaryUserData.email, alumniData.email)
      // setHistory((prev) => {
      //   return [
      //     ...prev,
      //     chatInput
      //   ]
      // })
      setChatInput("")
      // chatDiv.current.scrollTop = chatDiv.current.scrollHeight
    }
  }

  // useEffect(() => {

  //   // axios.get(`${API_BASE}/chat/${primaryUserData.email}`)
  //   //   .then((response) => {
  //   //     response = response.data
  //   //     if (response) {
  //   //       setHistory(response)
  //   //     }
  //   //   })

  //   socket.on("msg", (data) => {
  //     // console.log("socket api data");
  //     // console.log(data);
  //     setChatData((prev) => {
  //       return [
  //         ...prev,
  //         data
  //       ]
  //     })
  //     // chatEndDiv.current?.scrollIntoView()
  //   })
  // }, [])


  useEffect(() => {
    // console.log("chat");
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
          {/* <ChatBox text={"sent by you"} profile_image={profile_image} type={'sent'} /> */}
          {
            chatData.map((chat, index) => {
              var profile_pic;
              profile_pic = studentsData.find((item) => item.email === chat.sender)

              if (profile_pic){
                profile_pic = profile_pic.image
              }
              else{
                profile_pic = alumniData.image
              }
              return <ChatBox key={index} text={chat.text} profile_image={profile_pic} type={primaryUserData.email === chat.sender ? "sent" : "recieved"} />
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

          <button ref={btn} style={{ display: "flex" }} onClick={handleSendClick} >
            <img style={styles.send_icon} src={arrow} alt="" />
            <img style={styles.send_icon} src={arrow} alt="" />
          </button>

        </div>
      </div>
    </div>
  );
}
