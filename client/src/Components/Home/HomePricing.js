import { Grid } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const HomePricing = ({ box }) => {
	return (
		<div className='home-pricing gears-right-bg'>
			<section>
				<Grid container spacing={5} alignItems='stretch'>
					<Grid item xs={12} sm={5}>
						<div className='image-container'>
							<img
								src={`https://admin.gettpd.com/uploads/${box && box.img}`}
								alt={box && box.subtitle}
								width='500'
								height='550'
							/>
						</div>
					</Grid>
					<Grid item xs={12} sm={7}>
						<div className='hi-text'>
							<h3>{box && box.subtitle}</h3>
							<div
								className='hi-content'
								dangerouslySetInnerHTML={{
									__html: box && box.bodybox,
								}}
							></div>
							<div className='butoon-container'>
								<Link
									to='/pricing-for-professional-detailing-in-connecticut'
									className='fm-button'
								>
									<span>Learn More</span>
								</Link>
							</div>
						</div>
					</Grid>
				</Grid>
			</section>
		</div>
	);
};

export default HomePricing;
