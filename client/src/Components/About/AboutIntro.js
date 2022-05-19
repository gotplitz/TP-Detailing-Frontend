import { Grid } from '@mui/material';
import React from 'react';

const AboutIntro = ({ img, subtitle, content }) => {
	return (
		<div className='about-intro gears-right-bg'>
			<section>
				<Grid container spacing={5}>
					<Grid item xs={12} sm={12} md={6}>
						<div className='image-container'>
							<img
								src={`https://admin.gettpd.com/uploads/${img && img.fileName}`}
								alt={`Thomas posing in front of company's van`}
								width='750'
								height='390'
							/>
						</div>
					</Grid>
					<Grid item xs={12} sm={12} md={6}>
						<div className='hi-text'>
							<h2>{subtitle}</h2>
							<div
								className='hi-content'
								dangerouslySetInnerHTML={{ __html: content }}
							></div>
						</div>
					</Grid>
				</Grid>
			</section>
		</div>
	);
};

export default AboutIntro;
