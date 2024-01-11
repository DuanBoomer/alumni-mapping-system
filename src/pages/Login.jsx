import Header from '../components/Header';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { API_BASE } from '../App';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

async function getSHA256Hash(input) {
	const textAsBuffer = new TextEncoder().encode(input);
	const hashBuffer = await window.crypto.subtle.digest('SHA-256', textAsBuffer);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hash = hashArray
		.map((item) => item.toString(16).padStart(2, '0'))
		.join('');
	return hash;
}

export default function Login() {
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [err, setErr] = useState({
		error: false,
		text: 'email or password incorrect',
	});
	const [displayLoader, setDisplayLoader] = useState(false);

	useEffect(() => {
		var data = JSON.parse(localStorage.getItem('data'));
		if (data && data.email !== '') {
			navigate('/home', { state: data });
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
				} else if (response.data && response.data?.login === 'first time') {
					setErr({
						error: true,
						text: 'this is your first time logging in, please go to the sign up page first',
					});
				} else if (response.data && response.data?.login !== 'first time') {
					// sucessfull login
					setErr({ error: false, text: 'email or password incorrect' });
					axios
						.get(`${API_BASE}/data/${response.data.email}`)
						.then((response) => {
							localStorage.setItem('data', JSON.stringify(response.data));
							setDisplayLoader(false);
							navigate('/home', { state: response.data });
						})
						.catch((err) => {
							setErr({
								error: true,
								text: 'unable to fetch data at the moment',
							});
						});
				} else {
				}
			})
			.catch((err) => {
				setErr((prev) => {
					return { ...prev, error: true };
				});
			});
	}, [email, password]);

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

			{displayLoader ? (
				<p style={{ fontSize: 'var(--font-size-sm)', margin: '0.5em' }}>
					authorizing user details
				</p>
			) : null}
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
