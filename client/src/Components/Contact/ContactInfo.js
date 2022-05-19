import { Grid } from '@mui/material';
import React from 'react';

const ContactInfo = ({ boxes }) => {
	return (
		<div className='contact-info'>
			<section>
				<Grid container spacing={7} justifyContent='center'>
					{boxes &&
						boxes
							.sort((a, b) => a.order - b.order)
							.map((bx) => (
								<Grid key={bx._id} item xs={10} sm={8} md={4}>
									<div className='box-item'>
										<i
											className={`fal fa-${bx.img.replace('-light-0.svg', '')}`}
										></i>
										<div>{bx.subtitle}</div>
										<h4
											className='pm-content'
											dangerouslySetInnerHTML={{
												__html: bx.bodybox,
											}}
										></h4>
									</div>
								</Grid>
							))}
				</Grid>
			</section>
		</div>
	);
};

export default ContactInfo;
