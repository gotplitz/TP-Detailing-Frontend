import { Grid } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const HomeIntro = ({ img, title, subtitle, content }) => {
	return (
		<div className='home-intro gears-right-bg'>
			<section>
				<Grid container spacing={5}>
					<Grid item xs={12} sm={12} md={6}>
						<div className='image-container'>
							<picture>
								<source
									srcSet={`https://admin.gettpd.com/uploads/${img.replace(
										'.jpg',
										''
									)}.webp`}
									type='image/webp'
									width='500'
									height='600'
								/>
								<img
									src={`https://admin.gettpd.com/uploads/${img}`}
									alt={title}
									width='500'
									height='600'
								/>
							</picture>
						</div>
					</Grid>
					<Grid item xs={12} sm={12} md={6}>
						<div className='hi-text'>
							<h1>{title}</h1>
							<h3>{subtitle}</h3>
							<div
								className='hi-content'
								dangerouslySetInnerHTML={{ __html: content }}
							></div>
							<div className='butoon-container'>
								<Link
									to='/fully-insured-vehicle-detailing-in-connecticut'
									className='fm-button'
								>
									<span>Learn More</span>
								</Link>
							</div>
						</div>
					</Grid>
				</Grid>
			</section>
			<div className='dotted-bg'></div>
		</div>
	);
};

export default HomeIntro;
