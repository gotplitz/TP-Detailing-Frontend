import { Grid } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

// Images
import CorvetBg from '../../Images/corvette-bg.jpg';
import SmallGears from '../../Images/gears-bg-two.png';

// Parts
import Spinning from '../Extras/Spinning';
import Testimonials from '../Extras/Testimonials';

const HomeTestimonials = () => {
	const [testimonials, setTestiomonials] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const GetData = async () => {
			await axios
				.get('https://admin.gettpd.com/api/testimonials')
				.then((res) => {
					setTestiomonials(res.data);
					setLoading(false);
				});
		};

		return GetData();

		// eslint-disable-next-line
	}, []);

	return (
		<div
			className='home-testimonials'
			style={{ backgroundImage: `url(${CorvetBg})` }}
		>
			<section>
				<Grid container alignItems='center'>
					<Grid item xs={12} sm={8} md={4}>
						{loading ? (
							<Spinning />
						) : (
							<div className='ht-container'>
								<div className='centered-title'>
									<h3>Testimonials</h3>
								</div>
								<Testimonials testimonials={testimonials} />
							</div>
						)}
					</Grid>
					<Grid item xs={2} sm={4} md={8}></Grid>
				</Grid>
			</section>
			<div className='gears-left-bg'>
				<img
					src={SmallGears}
					width='602px'
					height='501px'
					alt='gears background'
				/>
			</div>
		</div>
	);
};

export default HomeTestimonials;
