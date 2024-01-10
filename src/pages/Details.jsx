import Header from '../components/Header';
import OutputField from '../components/OutputField';
import { useLocation } from 'react-router-dom';

export default function Details() {
	const location = useLocation();
	const data = location.state.data;
	const dontShow = ['name', 'desc', 'image', 'student_coordinator', 'alumni'];

	const styles = {
		profile_image: {
			width: '179px',
			height: '179px',
			objectFit: 'cover',
			borderRadius: '10px',
		},

		name: {
			margin: '0.5em 0',
			color: '#37352F',
			fontFamily: 'Poppins',
			fontSize: 'var(--font-size-xxl)',
			fontStyle: 'normal',
			fontWeight: '400',
			lineHeight: '30px',
			letterSpacing: '-0.333px',
		},

		desc: {
			margin: '0',
			color: '#5B574E',
			fontFamily: 'Poppins',
			fontSize: 'var(--font-size-md)',
			fontStyle: 'normal',
			fontWeight: '400',
			lineHeight: '105%',
		},
	};

	return (
		<div style={{ padding: '1em 1em 3em 1em' }}>
			<Header text={'Details'} />

			<div
				style={{
					display: 'flex',
					alignItems: 'flex-end',
					gap: '0.5em',
					marginBottom: '2em',
				}}>
				<img
					style={styles.profile_image}
					src={data.image}
					alt='profile'
				/>
				<div>
					<p style={styles.name}>{data.name}</p>
					<p style={styles.desc}>{data.desc}</p>
				</div>
			</div>

			{Object.keys(data).map((key, index) => {
				if (dontShow.includes(key)) {
					return <></>;
				} else {
					if (typeof data[key] === 'object') {
						return (
							<OutputField
								key={index}
								title={key}
								text={data[key].join(', ')}
							/>
						);
					} else {
						return (
							<OutputField
								key={index}
								title={key}
								text={data[key]}
							/>
						);
					}
				}
			})}

			<div style={{ height: 'calc(0.5em + 26px)' }}></div>
		</div>
	);
}
