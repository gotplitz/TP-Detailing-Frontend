import React from 'react';
import { Grid } from '@mui/material';
import ContactForm from '../Extras/ContactForm';

const HomeContact = () => {
	return (
		<div className='home-contact gears-right-bg'>
			<section>
				<Grid container justifyContent='flex-end'>
					<Grid item xs={12} sm={9} md={6}>
						<div className='centered-title'>
							<h3>Contact Us For a Free Estimate!</h3>
						</div>
						<ContactForm />
					</Grid>
				</Grid>
			</section>
			<div className='sport-car-bg'>
				<picture>
					<source
						srcSet='https://admin.gettpd.com/uploads/redsport-car-isolated.webp'
						type='image/webp'
					/>
					<img
						src='https://admin.gettpd.com/uploads/redsport-car-isolated.png'
						alt='Sport Red Car'
						width='660'
						height='304'
					/>
				</picture>
			</div>
		</div>
	);
};

export default HomeContact;
