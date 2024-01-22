import Header from '../components/Header';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { API_BASE } from '../App';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BouncyBallsLoader } from 'react-loaders-kit';

async function getSHA256Hash(input) {
	const textAsBuffer = new TextEncoder().encode(input);
	const hashBuffer = await window.crypto.subtle.digest('SHA-256', textAsBuffer);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hash = hashArray
		.map((item) => item.toString(16).padStart(2, '0'))
		.join('');
	return hash;
}

export default function Login({ setTrigger }) {
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [err, setErr] = useState({
		error: false,
		text: 'email or password incorrect',
	});
	const [displayLoader, setDisplayLoader] = useState(false);
	const loaderProps = {
		loading: displayLoader,
		size: 40,
		duration: 0.4,
		colors: [
			'var(--text-color-dark)',
			'var(--text-color-dark)',
			'var(--text-color-dark)',
		],
	};

	useEffect(() => {
		var data = JSON.parse(window.localStorage.getItem('PrimaryUserData'));
		if (data && data.email !== '') {
			setTrigger(1);
			navigate('/home');
		}
	}, []);

	const handleClick = useCallback(async () => {
		const password_hash = await getSHA256Hash(password);
		setErr((prev) => {
			return { ...prev, error: false };
		});
		setDisplayLoader(true);
		axios
			.post(`${API_BASE}/auth`, { email: email, password: password })
			.then((response) => {
				if (!response.data) {
					setErr({
						error: true,
						text: 'email or password incorrect, or unauthorised access',
					});
					setDisplayLoader(false);
				} else if (response.data && response.data?.login === 'first time') {
					setErr({
						error: true,
						text: 'this is your first time logging in, please go to the sign up page first',
					});
					setDisplayLoader(false);
				} else if (response.data && response.data?.login !== 'first time') {
					// sucessfull login
					setErr({ error: false, text: 'email or password incorrect' });
					axios
						.get(`${API_BASE}/data/${response.data.email}`)
						.then((response) => {
							window.localStorage.setItem(
								'PrimaryUserData',
								JSON.stringify(response.data)
							);
							setDisplayLoader(false);
							setTrigger(1);
							navigate('/home');
						})
						.catch((err) => {
							setErr({
								error: true,
								text: 'unable to fetch data at the moment',
							});
							setDisplayLoader(false);
						});
				} else {
				}
			})
			.catch((err) => {
				setErr((prev) => {
					return { ...prev, error: true };
				});
			});
	}, [email, password, setTrigger]);

	console.log(displayLoader);

	return (
		<>
			<Header text={'Login'} />
			<InputField
				title={'Email'}
				type={'email'}
				state={email}
				setState={(val) => setEmail(val)}
			/>
			<InputField
				title={'Password'}
				type={'password'}
				state={password}
				setState={(val) => setPassword(val)}
			/>

			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<Button
					text={'Login'}
					type={'light'}
					size={'small'}
					onClick={handleClick}
				/>
				<Button
					text={'first time? go to sign up'}
					type={'dark'}
					size={'small'}
					path={'/firsttimelogin'}
				/>
			</div>
			<div style={{ margin: '1em' }}>
				<BouncyBallsLoader {...loaderProps} />
			</div>

			{/* {displayLoader ? (
				<p style={{ fontSize: 'var(--font-size-sm)', margin: '0.5em' }}>
					authorizing user details
				</p>
			) : null} */}
			{err.error ? (
				<p
					style={{
						fontSize: 'var(--font-size-sm)',
						margin: '0.5em',
						color: 'red',
					}}>
					{err.text}
				</p>
			) : null}
		</>
	);
}
