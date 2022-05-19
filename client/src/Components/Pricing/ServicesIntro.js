import { Grid } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

// Static Images
import GearsBg from '../../Images/gears-black-bg.jpg';

const ServicesIntro = ({ title, content }) => {
	return (
		<div className='pricing-page'>
			<section>
				<Grid container spacing={0} justifyContent='center'>
					<Grid item xs={10} sm={9} md={8}>
						<div className='centered-title'>
							<h2>{title}</h2>
						</div>
						<div
							className='pp-content'
							dangerouslySetInnerHTML={{ __html: content }}
						></div>
						<div className='button-container'>
							<Link to='/contact-us' className='fm-button'>
								<span>Contact Us Now</span>
							</Link>
						</div>
					</Grid>
				</Grid>
			</section>

			{/* <div className='gears-center-bg'>
                <img
                    src={SmallGears}
                    width='628px'
                    height='405px'
                    alt='gears background'
                />
            </div> */}
			<div className='black-gears'>
				<img src={GearsBg} width='1920' height='275' alt='gears background' />
			</div>
		</div>
	);
};

export default ServicesIntro;
