import { useState, useRef, useEffect, useContext, useCallback } from 'react';
import Header from '../components/Header';
import arrow from '../assets/arrow.svg';
import copy from '../assets/copy-icon.svg';
import bin from '../assets/delete-icon.svg';
import back_button from '../assets/back-button.svg';
import { useNavigate } from 'react-router-dom';
import useLongPress from '../hooks/useLongPress';
import { DataContext } from '../App';
import axios from 'axios';
import { API_BASE } from '../App';
import { forwardRef } from 'react';
import { BouncyBallsLoader } from 'react-loaders-kit';
// import { VariableSizeList as List } from 'react-window';
// import AutoSizer from 'react-virtualized-auto-sizer';

const ChatBox = forwardRef(
	({ text, type, socket, sender, style, index }, ref) => {
		//
		const { action, handlers } = useLongPress({
			onClick: chatOnClick,
			onLongPress: chatOnLongPress,
		});
		const [showModal, setShowModal] = useState(false);
		const { alumniData, studentsData } = useContext(DataContext);

		var profile_image;
		profile_image = studentsData.find((item) => item.email === sender);

		if (profile_image) {
			profile_image = profile_image.image;
		} else {
			profile_image = alumniData.image;
		}

		let menuRef = useRef(null);

		useEffect(() => {
			let handler = (e) => {
				if (!menuRef.current?.contains(e.target)) {
					setShowModal(false);
				}
			};

			document.addEventListener('mousedown', handler);

			return () => {
				document.removeEventListener('mousedown', handler);
			};
		}, []);

		const styles = {
			profile_image: {
				height: '2.5em',
				width: '2.5em',
				objectFit: 'cover',
				margin: 0,
				padding: 0,
				borderRadius: '10px',
			},

			text: {
				border: 'none',
				padding: '1em',
				width: 'fit-content',
				userSelect: 'none',
				textAlign: 'left',
				margin: '0',
				color: 'var(text-color-light)',
				fontSize: 'var(--font-size-sm)',
				borderRadius:
					type === 'sent' ? '18px 18px 0px 18px' : '18px 18px 18px 0px',
				background: 'var(--main-bg-color)',
				boxShadow:
					'-5px -5px 10px 0px var(--light-shadow) inset, 5px 5px 10px 0px var(--dark-shadow) inset',
			},

			div: {
				position: 'relative',
				display: 'flex',
				justifyContent: type === 'sent' ? 'end' : 'start',
				alignItems: 'end',
				gap: '0.75em',
				margin: '0.75em 1em 0.75em 0em',
				wordBreak: 'break-word',
			},

			modal: {
				position: 'absolute',
				top: '2em',
				zIndex: 2,
				padding: '1em',
				margin: '1em 3em 0 3em',
				borderRadius: '18px',
				background: 'var(--main-bg-color)',
				boxShadow:
					'-5px -5px 10px 0px var(--light-shadow) inset, 5px 5px 10px 0px var(--dark-shadow) inset',
			},

			modalButton: {
				display: 'flex',
				alignItems: 'center',
				gap: '10px',
				background: 'none',
				border: 'none',
				// textDecoration: "underline",
			},
		};

		function chatOnClick() {
			// console.log('click');
		}

		function chatOnLongPress() {
			setShowModal(true);
			// console.log('long press');
		}

		function chatDelete() {
			socket.emit('msgdelete', text, sender, alumniData.email);
			// console.log('del click');
			setShowModal(false);
		}

		function chatCopy() {
			navigator.clipboard.writeText(text);
			setShowModal(false);
		}

		return (
			<div
				ref={ref}
				key={index}
				style={{ ...styles.div, ...style }}>
				{type === 'sent' ? (
					<>
						<button
							{...handlers}
							style={styles.text}>
							{text}
						</button>
						<img
							style={styles.profile_image}
							src={profile_image}
							alt='profile'
						/>
					</>
				) : (
					<>
						<img
							style={styles.profile_image}
							src={profile_image}
							alt='profile'
						/>
						<button
							{...handlers}
							style={styles.text}>
							{text}
						</button>
					</>
				)}

				{showModal ? (
					<div
						style={styles.modal}
						ref={menuRef}>
						{type === 'sent' ? (
							<button
								onClick={chatDelete}
								style={styles.modalButton}>
								<img src={bin} />
								delete
							</button>
						) : (
							<></>
						)}
						<button
							onClick={chatCopy}
							style={styles.modalButton}>
							<img src={copy} />
							copy
						</button>
					</div>
				) : (
					<></>
				)}
			</div>
		);
	}
);

export default function Chat({ socket }) {
	const navigate = useNavigate();
	const { alumniData } = useContext(DataContext);
	const primaryUserData = JSON.parse(
		window.localStorage.getItem('PrimaryUserData')
	);

	const [skip, setSkip] = useState(0);
	const [loadingChat, setLoadingChat] = useState(false);
	const [chatData, setChatData] = useState([]);
	const [chatInput, setChatInput] = useState('');
	const observer = useRef(null);
	const btn = useRef(null);
	const chatEndDiv = useRef(null);
	const senderUser = useRef(null);
	const chatDiv = useRef(null);
	const limit = useRef(10);
	const [chatEndReached, setChatEndReached] = useState(false);

	const loaderProps = {
		loading: loadingChat && !chatEndReached,
		size: 40,
		duration: 0.4,
		colors: [
			'var(--text-color-dark)',
			'var(--text-color-dark)',
			'var(--text-color-dark)',
		],
	};

	const styles = {
		chat: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			height: '80vh',
			height: 'calc(100vh - 2*75px - 20px - 60px - 25px)', // total height - twice header height - bottom offset -browser offset -back button size
			borderRadius: '18px',
			padding: '1rem',
			background: 'var(--main-bg-color)',
			boxShadow:
				'-8px -8px 16px 0px var(--light-shadow), 8px 8px 16px 0px var(--dark-shadow)',
		},

		input: {
			color: 'var(--test-color-light)',
			verticalAlign: 'middle',
			background: 'var(--main-bg-color)',
			fontFamily: 'Poppins',
			fontSize: 'var(--font-size-sm)',
			fontStyle: 'normal',
			fontWeight: '400',
			lineHeight: 'normal',
			border: 'none',
			outline: 'none',
			width: '100%',
			borderBottom: '2px solid var(--text-color-light)',
		},

		send_icon: {
			width: 'var(--font-size-sm)',
		},
	};

	function handleSendClick() {
		if (chatInput && chatInput.replace(/\s/g, '').length && socket) {
			socket.emit('msg', chatInput, primaryUserData.email, alumniData.email);
			setChatInput('');
		}
	}

	const chatReloadRef = useCallback(
		(node) => {
			if (!node) return;
			if (loadingChat) return;
			//loading
			if (observer.current) observer.current.disconnect();
			console.log(node);
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && !loadingChat) {
					setLoadingChat(true);
					axios
						.get(
							`${API_BASE}/chat/${alumniData.email}?skip=${skip}&limit=${limit.current}`
						)
						.then((response) => {
							if (response.data.length > 0) {
								setChatData((prev) => {
									return [...response.data, ...prev];
								});
								chatDiv.current?.scrollBy(0, 400);

								setSkip((prev) => prev + limit.current);
								setLoadingChat(false);
							} else {
								setLoadingChat(true);
								setChatEndReached(true);
							}
						})
						.catch((err) => {});
				}
			});
			// prevNode.current?.scrollIntoView();
			observer.current.observe(node);
			// prevNode.current = node;
		},
		[skip, loadingChat]
	);

	useEffect(() => {
		axios
			.get(
				`${API_BASE}/chat/${alumniData.email}?skip=${skip}&limit=${limit.current}`
			)
			.then((response) => {
				setSkip((prev) => prev + limit.current);
				setChatData((prev) => {
					return [...response.data, ...prev];
				});

				socket.on('msg', (data) => {
					// console.log(data);
					setChatData((prev) => {
						return [...prev, data];
					});
					senderUser.current = data.sender;
				});
				socket.on('msgdelete', (data) => {
					setChatData((prev) => {
						// console.log('chat del');
						var newChat = prev.filter(
							(chat) =>
								!(chat.text === data.text && chat.sender === data.sender)
						);
						return newChat;
					});
				});
			})
			.catch((err) => {});
	}, []);

	useEffect(() => {
		if (senderUser.current === primaryUserData.email) {
			senderUser.current = null;
			chatEndDiv.current?.scrollIntoView();
		}
	}, [chatData]);

	function getItemSize(index) {
		// ( stoneSlab - bothSidePadding - chatBoxMargin - imageSize - chatBoxPadding ) / oneCharWidth
		var chars =
			(document.querySelector('.stone-slab').offsetWidth -
				2 * 16 -
				16 -
				40 -
				14) /
			8;

		// chatLength / no of chars that can be accomodated in a line
		var lines = Math.ceil(chatData[index].text.length / chars);

		// number of lines * line height + chat box padding + gap between chatbox
		var height = lines * 16 + 2 * 16 + 6;

		return height;
	}
	// console.log(chatData);
	console.log(chatDiv.current?.scrollTop);

	return (
		<>
			{/* back button */}
			<div
				style={{
					display: 'flex',
					cursor: 'pointer',
					zIndex: '2',
					position: 'relative',
				}}
				onClick={() => navigate('/home')}>
				<img
					style={{ width: '20px', marginRight: '5px' }}
					src={back_button}
					alt='go back'
				/>
				<p style={{ margin: 0, padding: 0 }}>back</p>
			</div>
			<Header text={'Chat'} />

			<div
				style={styles.chat}
				className='stone-slab'>
				{/* chat display */}
				{chatData.length !== 0 ? (
					<div
						ref={chatDiv}
						style={{ overflowY: 'scroll' }}>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<BouncyBallsLoader {...loaderProps} />
						</div>
						{chatData.map((chat, index) => {
							return (
								<ChatBox
									ref={index === 0 ? chatReloadRef : null}
									index={index}
									socket={socket}
									text={chat.text}
									sender={chat.sender}
									// style={style}
									type={
										primaryUserData.email === chat.sender ? 'sent' : 'recieved'
									}
								/>
							);
						})}
						<div ref={chatEndDiv}></div>
					</div>
				) : (
					<p>loading</p>
				)}

				{/* {chatData ? (
					<>
						<AutoSizer>
							{({ height, width }) => (
								<>
									<List
									ref={chatEndDiv}
										width={width}
										height={height - 30}
										// itemCount={55}
										itemCount={chatData.length}
										itemSize={getItemSize}>
										{({ index, style }) => (
											<ChatBox
												index={index}
												socket={socket}
												text={chatData[index].text}
												sender={chatData[index].sender}
												style={style}
												type={
													primaryUserData.email === chatData[index].sender
														? 'sent'
														: 'recieved'
												}
											/>
										)}
									</List>
								</>
							)}
						</AutoSizer>
							<div style={{height: '50px', width: '50px', backgroundColor: 'red'}} ref={chatEndDiv}></div>
					</>
				) : (
					<p>loading</p>
				)} */}

				{/* chat input */}
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						gap: '1em',
						padding: '1em 0 0 0',
					}}>
					<input
						style={styles.input}
						placeholder='Type a message'
						value={chatInput}
						onKeyDown={(e) => (e.key === 'Enter' ? btn.current.click() : {})}
						onChange={(event) => {
							setChatInput(event.target.value);
						}}
					/>

					{/* send button */}
					<button
						ref={btn}
						style={{ display: 'flex', background: 'none', border: 'none' }}
						onClick={handleSendClick}>
						<img
							style={styles.send_icon}
							src={arrow}
							alt=''
						/>
						<img
							style={styles.send_icon}
							src={arrow}
							alt=''
						/>
					</button>
				</div>
			</div>
		</>
	);
}
