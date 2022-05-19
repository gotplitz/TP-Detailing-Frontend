import { Grid } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

// Static Images
import SmallGears from '../../Images/gears-bg-two.png';

const MainContent = ({ box, subtitle, content }) => {
	return (
		<div className='services-block'>
			<section>
				<Grid container spacing={5} justifyContent='center' alignItems='center'>
					<Grid item xs={12} sm={12} md={6}>
						<div className='sp-block-container'>
							<div className='service-subtitle'>
								<h2>{subtitle}</h2>
							</div>
							<div
								className='sp-content'
								dangerouslySetInnerHTML={{ __html: content }}
							></div>
							<div className='button-container'>
								<Link to={box.bodybox} className='fm-button'>
									<span>{box.subtitle}</span>
								</Link>
							</div>
						</div>
					</Grid>
					<Grid item xs={12} sm={12} md={6}>
						<div className='image-container'>
							<img
								src={`https://admin.gettpd.com/uploads/${box.img}`}
								alt={box.img}
								width='500'
								height='700'
							/>
						</div>
					</Grid>
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
			<div className='pink-block'></div>
		</div>
	);
};

export default MainContent;
