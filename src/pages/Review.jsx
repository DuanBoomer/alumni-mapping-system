import Header from '../components/Header';
import { DataContext } from '../App';
import { useContext, useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import axios from 'axios';
import { API_BASE } from '../App';
import { useLocation, useNavigate } from 'react-router-dom';
export default function Review() {
	const location = useLocation();
	const navigate = useNavigate();
	const eventData = location.state;
	const { alumniData, studentsData } = useContext(DataContext);

	const [studentReviews, setStudentReviews] = useState(
		studentsData.map((item, index) => {
			return {
				email: item.email,
				review: eventData.reviews ? eventData.reviews[index].review : 'some',
			};
		})
	);

	function post_review() {
		axios
			.post(`${API_BASE}/review/students/${alumniData.email}`, {
				event: eventData,
				reviews: { data: studentReviews },
			})
			.then((response) => {
				navigate('/home');
			})
			.catch((error) => {});
	}

	return (
		<>
			<Header text={'Review'} />
			{studentsData.map((student, index) => {
				return (
					<div key={index}>
						<InputField
							title={student.name}
							type={'textarea'}
							placeholder={'leave a review'}
							rows={4}
							state={studentReviews[index].review}
							setState={(val) => {
								setStudentReviews((prev) => {
									let newArr = prev;
									newArr[index] = {
										email: student.email,
										review: val,
									};

									return [...newArr];
								});
							}}
						/>
					</div>
				);
			})}
			<Button
				text={'submit'}
				size={'big'}
				onClick={post_review}
			/>
		</>
	);
}
