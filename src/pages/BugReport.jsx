import Header from '../components/Header';
import InputField from '../components/InputField';
import { useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../App';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function BugReport() {
	const [report, setReport] = useState('');
	const navigate = useNavigate();

	const primaryUserData = JSON.parse(
		window.localStorage.getItem('PrimaryUserData')
	);
	function post_report() {
		axios
			.post(`${API_BASE}/bugreport/${primaryUserData.email}`, {
				message: report,
			})
			.then((response) => {
				navigate('/profile');
			})
			.catch((error) => {});
	}
	return (
		<>
			<Header text={'Bug Report'} />
			<InputField
				title={'What problem did you face?'}
				type={'textarea'}
				rows={15}
				state={report}
				setState={setReport}
			/>
			<Button
				text={'Submit'}
				size={'big'}
				onClick={post_report}
			/>
		</>
	);
}
