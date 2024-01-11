import mickey from "../assets/loading/loading-mickey.gif"
// import hand from "../assets/loading/loading-hand.gif"
import old from "../assets/loading/loading-old-man.gif"
import thinker from "../assets/loading/loading-thinker.gif"
import github from "../assets/loading/mona-loading-dark.gif"

export default function Loading() {
	const styles = {
		screen: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: 'var(--main-bg-color)',
			height: '100vh',
			width: '100vw',
			position: 'fixed',
			top: '0',
			left: '0',
			zIndex: '100',
		},
		loading_gif: {
			width: "15rem",
			borderRadius: '20px',
		}
	};
	const gifs = [mickey, old, thinker, github]
	const src_gif_index = Math.floor(Math.random() * gifs.length);
	return (
		<div style={styles.screen}>
			{/* <p style={{ margin: 0 }}>Loading</p> */}
			<img src={gifs[src_gif_index]} alt="loading gif" style={styles.loading_gif} />
		</div>
	);
}
