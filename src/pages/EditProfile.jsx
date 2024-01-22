import Header from '../components/Header';
import Button from '../components/Button';
import Modal from '../components/Modal';
// import InputField from "../components/InputField";
// import OutputField from "../components/OutputField"
import FormInputField from '../components/FormInputField';
import { useForm } from 'react-hook-form';

import { BouncyBallsLoader } from 'react-loaders-kit';
import { API_BASE } from '../App';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function EditProfile({ setAlumniData, setStudentsData }) {
	const navigate = useNavigate();
	const primaryUserData = JSON.parse(
		window.localStorage.getItem('PrimaryUserData')
	);
	const [showModal, setShowModal] = useState(false);
	const [userImage, setUserImage] = useState(primaryUserData.image);
	const [loading, setLoading] = useState(false);
	const loaderProps = {
		loading: loading,
		size: 40,
		duration: 0.4,
		colors: [
			'var(--text-color-dark)',
			'var(--text-color-dark)',
			'var(--text-color-dark)',
		],
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { ...primaryUserData, expertise: primaryUserData?.expertise.join(",")},
	});

	function convertImageToBase64(e, setState) {
		var reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = () => {
			setState(reader.result);
		};
		reader.onerror = (error) => {
			// console.log('File upload error', error);
		};
	}

	function setImage(e) {
		convertImageToBase64(e, setUserImage);
	}

	function handleSubmitClick(data) {
		console.log(data);
		setLoading(true);
		if (primaryUserData.alumni) {
			axios
				.put(`${API_BASE}/update/student/${primaryUserData.email}`, {
					...data,
					image: userImage,
				})
				.then((response) => {
					setShowModal(false);
					setLoading(false);
					window.localStorage.setItem('PrimaryUserData', {
						...data,
						image: userImage,
					});
					setStudentsData((prev) => {
						const newArr = prev.map((student) => {
							if (student.email === data.email) {
								return {
									...data,
									image: userImage,
								};
							} else {
								return student;
							}
						});

						return newArr;
					});
					navigate('/profile');
				})
				.catch((error) => {
					// console.log(error);
				});
		} else {
			console.log(data);
			axios
				.put(`${API_BASE}/update/alumni/${primaryUserData.email}`, {
					...data,
					image: userImage,
					expertise: data.expertise.split(','),
				})
				.then((response) => {
					setShowModal(false);
					setLoading(false);
					window.localStorage.setItem(
						'PrimaryUserData',
						JSON.stringify({
							...data,
							image: userImage,
							expertise: data.expertise.split(','),
						})
					);
					setAlumniData({
						...data,
						image: userImage,
						expertise: data.expertise.split(','),
					});
					navigate('/profile');
				})
				.catch((error) => {
					// console.log(error);
				});
		}
	}

	return (
		<>
			<Header text={'Edit Profile'} />

			<form onSubmit={handleSubmit(handleSubmitClick)}>
				<div style={{ display: 'flex', gap: '0.5em', marginBottom: '1em' }}>
					<div style={styles.partition}>
						<img
							style={styles.profile_image}
							src={userImage}
							alt='profile'
						/>
					</div>

					<div style={styles.partition}>
						<input
							style={{ ...styles.long_input, flexGrow: 0 }}
							{...register('name')}
							placeholder='roronoa zoro'
						/>
						<textarea
							style={styles.long_input}
							rows={'3'}
							placeholder='desc'
							{...register('desc')}
						/>
					</div>
				</div>

				<input
					{...register('image')}
					onChange={(e) => setImage(e)}
					accept='image/*'
					type={'file'}
				/>

				{primaryUserData.alumni ? (
					<div>
						<FormInputField
							title={'Roll No'}
							type={'text'}
							label={'roll_no'}
							regex={/[A-Z]+\d\d\/\d\d\d/i}
							regexErrorMessage={'roll no must be of the format CSE21/017'}
							placeholder={'cse21/017'}
							register={register}
							errors={errors}
						/>
						<FormInputField
							title={'Course'}
							type={'text'}
							label={'course'}
							regex={/[A-Z]+/i}
							regexErrorMessage={'form some'}
							placeholder={'sdsd'}
							register={register}
							errors={errors}
						/>
						<FormInputField
							title={'Stream'}
							type={'text'}
							label={'stream'}
							regex={/[A-Z]+/i}
							regexErrorMessage={'form some'}
							placeholder={'cse'}
							register={register}
							errors={errors}
						/>
					</div>
				) : (
					<div>
						<FormInputField
							title={'Batch'}
							type={'text'}
							label={'batch'}
							regex={/\d\d\d\d-\d\d/i}
							regexErrorMessage={'batch must be of the form 1999-24'}
							placeholder={'1999-24'}
							register={register}
							errors={errors}
						/>
						<FormInputField
							title={'Company'}
							type={'text'}
							label={'company'}
							regex={/[A-Za-z0-9]+/i}
							regexErrorMessage={'company name must only be alphanumeric'}
							placeholder={'my great company'}
							register={register}
							errors={errors}
						/>
						<FormInputField
							title={'Position'}
							type={'text'}
							label={'position'}
							regex={/[A-Za-z0-9]+/i}
							regexErrorMessage={'position must be only alphanumeric'}
							placeholder={'ceo of my great company'}
							register={register}
							errors={errors}
						/>
						<FormInputField
							title={'Expertise'}
							type={'text'}
							label={'expertise'}
							regex={/[A-Za-z]+/i}
							regexErrorMessage={'enter some expertise'}
							placeholder={'ml, ai, bots'}
							register={register}
							errors={errors}
						/>
					</div>
				)}

				<Button
					text={'Submit'}
					type={'light'}
					size={'big'}
					onClick={() => {setShowModal(true)}}
				/>

				<Modal
					showModal={showModal}
					setShowModal={setShowModal}>
					<p>Are you sure you want to save these changes?</p>
					<div style={{ display: 'flex' }}>
						<Button
							text={'yes'}
							type={'light'}
							action={'submit'}
							size={'small'}
							onClick={handleSubmit(handleSubmitClick)}
						/>
						<BouncyBallsLoader {...loaderProps} />
					</div>
					<Button
						text={'no'}
						type={'dark'}
						size={'small'}
						disabled={loading}
						onClick={() => {
							setShowModal(false);
							setLoading(false);
						}}
					/>
				</Modal>
			</form>

			<div style={{ height: 'calc(0.5em + 26px)' }}></div>
		</>
	);
}

const styles = {
	profile_image: {
		width: '100%',
		aspectRatio: '1/1',
		objectFit: 'cover',
		minWidth: '100px',
		maxHeight: '400px',
		borderRadius: '10px',
	},

	long_input: {
		flexGrow: 1,
		flexBasis: 0,
		flexShrink: 0,

		padding: '1rem 2rem',
		width: 'calc(100% - 4.5em)',

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
	partition: {
		flexGrow: 1,
		flexBasis: 0,
		flexShrink: 0,
		gap: '0.5em',

		display: 'flex',
		flexDirection: 'column',
	},
};
