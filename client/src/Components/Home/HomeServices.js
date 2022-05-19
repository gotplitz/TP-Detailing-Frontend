import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinning from '../Extras/Spinning';
import { Link } from 'react-router-dom';

// Static Images
import SmallGears from '../../Images/gears-bg-two.png';
import GearsBg from '../../Images/gears-black-bg.jpg';

const SplitString = ({ srv }) => {
	const removePs = srv.split('<p>');

	return (
		<div className='sb-content-body'>{removePs[1].replace('</p>', '')}</div>
	);
};

const HomeServices = () => {
	const [services, setServices] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const GetData = async () => {
			await axios.get('https://admin.gettpd.com/api/services').then((res) => {
				setServices(res.data);
				setLoading(false);
			});
		};

		return GetData();

		// eslint-disable-next-line
	}, []);

	return (
		<div className='services-block'>
			<section>
				<Grid container spacing={3} justifyContent='center'>
					<Grid item xs={12}>
						<div className='centered-title'>
							<h3>Services</h3>
						</div>
					</Grid>
					{loading ? (
						<section>
							<Spinning />
						</section>
					) : (
						services &&
						services.map((srv) => (
							<Grid item xs={12} sm={6} md={4} key={srv._id}>
								<div className='sb-item'>
									<div className='sb-content'>
										<h5>{srv.servicetitle}</h5>
										<SplitString srv={srv.servicedetails} />
										<div className='sb-content-button'>
											<Link
												to={`/services/${srv.servicelink}`}
												className='fm-button'
											>
												<span>Learn More</span>
											</Link>
										</div>
									</div>
									<div className='sb-title'>
										<h4>{srv.servicetitle}</h4>
									</div>
									<div className='sb-featuredimg'>
										<picture>
											<source
												media='(max-width: 600px)'
												srcSet={`https://admin.gettpd.com/uploads/${srv.featuredimg.replace(
													'.jpg',
													''
												)}.webp 600w`}
												alt={srv.servicetitle}
											/>
											<source
												srcSet={`https://admin.gettpd.com/uploads/${srv.featuredimg.replace(
													'.jpg',
													''
												)}.webp`}
												type='image/webp'
												width='1500'
												height='800'
											/>
											<img
												src={`https://admin.gettpd.com/uploads/${srv.featuredimg}`}
												alt={srv.servicetitle}
												width='1500'
												height='800'
											/>
										</picture>
									</div>
								</div>
							</Grid>
						))
					)}
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
			<div className='black-gears'>
				<img src={GearsBg} width='1920' height='275' alt='gears background' />
			</div>
		</div>
	);
};

export default HomeServices;
