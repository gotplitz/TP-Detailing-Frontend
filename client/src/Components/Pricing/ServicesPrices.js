import { Grid } from '@mui/material';
import React from 'react';

const ServicesPrices = ({ boxes }) => {
	return (
		<div className='pricing-menu'>
			<section>
				<Grid container spacing={7} justifyContent='center'>
					{boxes &&
						boxes
							.sort((a, b) => a.order - b.order)
							.map((bx) => (
								<Grid key={bx._id} item xs={10} sm={8} md={5}>
									<div className='box-item'>
										<i className='fas fa-tag'></i>
										<h3>{bx.subtitle}</h3>
										<div
											className='pm-content'
											dangerouslySetInnerHTML={{
												__html: bx.bodybox,
											}}
										></div>
									</div>
								</Grid>
							))}
				</Grid>
			</section>
		</div>
	);
};

export default ServicesPrices;
