import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Logout({ setTrigger, setAlumniData, setEventsData, setStudentsData }) {
	const navigate = useNavigate();
	useEffect(() => {
		localStorage.clear();
		setTrigger(0);
		setAlumniData(null);
		setEventsData(null);
		setStudentsData(null);
		navigate('/');
	}, []);
}
