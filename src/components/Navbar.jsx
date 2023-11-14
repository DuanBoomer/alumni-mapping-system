import home from "../assets/home-icon.svg";
import chats from "../assets/chat-icon.svg";
import profile from "../assets/profile-icon.svg";
import { useNavigate } from "react-router-dom";

function Navbar({ id }) {

  const navigate = useNavigate();

  const styles = {
    div: {
      display: "flex",
      padding: "0.5em",
      justifyContent: "space-evenly",
      borderRadius: "15px",
      background: "#E0E0E0",
      boxShadow: "5px 5px 10px 0px #BEBEBE, -5px -5px 10px 0px #FFF",

      position: "fixed",
      bottom: "1em",
      left: "1em",
      right: "1em"

    }
  }

  function handleClick(path) {
    navigate(path, { state: { userID: id } })
  }

  return (
    <div style={styles.div}>
      <img onClick={() => { handleClick("/home") }} src={home} alt="" />
      <img onClick={() => { handleClick("/chat") }} src={chats} alt="" />
      <img onClick={() => { handleClick("/profile") }} src={profile} alt="" />
    </div>
  )
}

export default Navbar;