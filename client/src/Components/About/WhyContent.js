import { Grid } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const WhyContent = ({ box }) => {
	return (
		<div className='au-extrabox'>
			<section>
				<Grid container spacing={5} alignItems='center'>
					<Grid item xs={12} sm={12} md={6}>
						<div className='hi-text'>
							<h3>{box && box.subtitle}</h3>
							<div
								className='hi-content'
								dangerouslySetInnerHTML={{
									__html: box && box.bodybox,
								}}
							></div>
							<div className='button-container'>
								<Link to='/contact-us' className='fm-button'>
									<span>Contact Us</span>
								</Link>
							</div>
						</div>
					</Grid>
					<Grid item xs={12} sm={12} md={6}>
						<div className='image-container'>
							<img
								src={`https://admin.gettpd.com/uploads/${box && box.img}`}
								alt={box && box.subtitle}
								width='700'
								height='700'
							/>
						</div>
						<div className='image-block'></div>
					</Grid>
				</Grid>
			</section>
		</div>
	);
};

export default WhyContent;
