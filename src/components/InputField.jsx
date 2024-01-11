import eye_opened from '../assets/eye-opened.svg';
import eye_closed from '../assets/eye-closed.svg';

import { useState, useCallback } from 'react';

export default function InputField({
	title,
	type,
	state,
	setState,
	button,
	rows,
}) {
	const [passwordShown, setPasswordShown] = useState(false);

	const togglePassword = useCallback(() => {
		setPasswordShown(!passwordShown);
	}, [passwordShown]);

	const convertImageToBase64 = useCallback((e) => {
		var reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = () => {
			setState(reader.result);
		};
		reader.onerror = (error) => {};
	}, []);

	var InputField;

	switch (type) {
		case 'textarea':
			InputField = (
				<textarea
					style={styles.textarea}
					rows={rows}
					placeholder='something long'
					value={state}
					onChange={(event) => setState(event.target.value)}
				/>
			);
			break;

		case 'password':
			InputField = (
				<>
					<input
						style={styles.input}
						placeholder="something secret"
						type={passwordShown ? 'text' : 'password'}
						value={state}
						onChange={(event) => setState(event.target.value)}
					/>
					<img
						onClick={togglePassword}
						style={styles.icon}
						src={passwordShown ? eye_opened : eye_closed}
						alt='show password'
					/>
				</>
			);
			break;

		case 'email':
			InputField = (
				<input
					style={styles.input}
					placeholder="give me a email"
					type={'email'}
					value={state}
					onChange={(event) => setState(event.target.value.toLowerCase())}
				/>
			);
			break;

		case 'date':
			InputField = (
				<input
					style={styles.input}
					placeholder="a date"
					type={'date'}
					value={state}
					onChange={(event) => setState(event.target.value)}
				/>
			);
			break;

		case 'time':
			InputField = (
				<input
					style={styles.input}
					placeholder="a time"
					type={'time'}
					value={state}
					onChange={(event) => setState(event.target.value)}
				/>
			);
			break;

		case 'url':
			InputField = (
				<input
					style={styles.input}
					placeholder="some awesome link"
					type={'url'}
					value={state}
					onChange={(event) => setState(event.target.value)}
				/>
			);
			break;

		case 'imagefile':
			InputField = (
				<input
					accept='image/*'
					style={styles.input}
					type={'file'}
					onChange={convertImageToBase64}
				/>
			);
			break;

		default:
			InputField = (
				<input
					style={styles.input}
					type={'text'}
					value={state}
					onChange={(event) => setState(event.target.value)}
				/>
			);
			break;
	}

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				position: 'relative',
			}}>
			<div style={{ display: 'flex' }}>
				<p style={styles.title}>{title}</p>
				{button}
			</div>
			{InputField}
		</div>
	);
}

const styles = {
	input: {
		padding: '1rem 2rem',
		border: 'none',
		outline: 'none',
		marginBottom: '0.5em',
		color: 'var(--text-color-light)',
		fontFamily: 'Poppins',
		fontSize: 'var(--font-size-sm)',
		fontStyle: 'normal',
		fontWeight: '400',
		lineHeight: 'normal',
		borderRadius: '13px',
		background: 'var(--main-bg-color)',
		boxShadow:
			'-5px -5px 10px 0px var(--light-shadow) inset, 5px 5px 10px 0px var(--dark-shadow) inset',
	},

	title: {
		color: 'var(--text-color-light)',
		fontFamily: 'Poppins',
		fontSize: 'var(--font-size-md)',
		fontStyle: 'normal',
		fontWeight: '400',
		lineHeight: 'normal',
		margin: '0em 1em 0em 0em',
	},

	icon: {
		width: 'var(--font-size-md)',
		position: 'absolute',
		right: '15px',
		bottom: 'calc(50% - var(--font-size-md))', // half width - title size
	},
	textarea: {
		padding: '1rem 2rem',
		marginBottom: '0.5em',
		// padding: "0.75rem 1.25rem",
		border: 'none',
		outline: 'none',
		color: 'var(--text-color-light)',
		fontFamily: 'Poppins',
		fontSize: 'var(--font-size-sm)',
		fontStyle: 'normal',
		fontWeight: '400',
		lineHeight: 'normal',
		borderRadius: '13px',
		background: 'var(--main-bg-color)',
		boxShadow:
			'-5px -5px 10px 0px var(--light-shadow) inset, 5px 5px 10px 0px var(--dark-shadow) inset',
	},
};
