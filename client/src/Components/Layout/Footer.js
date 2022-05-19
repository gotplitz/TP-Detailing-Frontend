import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

// Images
import FooterLogo from '../../Images/TP-piston.png';
// import BbbLogo from '../../Images/bbb-badge-and-logo.png';

// Parts
import SocialNetworks from '../Extras/SocialNetworks';
import Spinning from '../Extras/Spinning';

const Footer = () => {
	const [pages, setPages] = useState([]);
	const [services, setServices] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const GetData = async () => {
			const pdata = await axios.get('https://admin.gettpd.com/api/pages');
			const sdata = await axios.get('https://admin.gettpd.com/api/services');

			Promise.all([pdata, sdata]).then((res) => {
				setPages(res[0].data);
				setServices(res[1].data);
				setLoading(false);
			});
		};

		return GetData();

		// eslint-disable-next-line
	}, []);

	const onClick = () => {
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	};

	return (
		<footer className='footer-container'>
			<section>
				{loading ? (
					<Spinning />
				) : (
					<Grid container spacing={7}>
						<Grid item xs={12} sm={12} md={3}>
							<div className='footer-logo-container'>
								<img
									src={FooterLogo}
									alt='Piston logo'
									width='130'
									height='130'
								/>
							</div>
							<div className='footer-closing'>
								We service all of CT and offer free estimates 24/7
							</div>
							<div className='foot-phone'>
								<i className='fas fa-phone'></i>{' '}
								<a href='tel:2035514076'>(203) 551-4076</a>
							</div>
							<div className='footer-sn'>
								<span>Follow Us:</span>
								<SocialNetworks />
							</div>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<ul>
								{pages &&
									pages

										.sort((a, b) => new Date(a.date) - new Date(b.date))
										.slice(1, 10)
										.map(
											(pg) =>
												pg.menuname !== 'Services' && (
													<li key={pg._id}>
														<NavLink
															exact
															activeClassName='footer-active'
															onClick={onClick}
															to={`/${
																pg.menuname === 'Home' ? '' : pg.pagelink
															}`}
														>
															{pg.menuname}
														</NavLink>
													</li>
												)
										)}
							</ul>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<div className='footer-bar-title'>
								<h4>Services</h4>
							</div>
							<ul>
								{services &&
									services
										.sort((a, b) => new Date(b.date) - new Date(a.date))
										.map((srv) => (
											<li key={srv._id}>
												<NavLink
													exact
													onClick={onClick}
													to={`/services/${srv.servicelink}`}
													activeClassName='footer-active'
												>
													{srv.menuname}
												</NavLink>
											</li>
										))}
							</ul>
						</Grid>
						<Grid item xs={12} sm={12} md={3}>
							<div className='footer-bar-title'>
								<h4>Business Hours</h4>
							</div>
							<ul>
								<li>Friday: 8:00am - 6:00pm</li>
								<li>Saturday: 8:00am - 6:00pm</li>
								<li>Sunday: 8:00am - 3:00pm</li>
							</ul>
							{/*
                            <div className='bbb-footer-logo'>
                                <a
                                    href='https://www.bbb.org:443/us/ct/shelton/profile/auto-detailing/tps-professional-detailing-0111-87145838/accreditation-information'
                                    title='Acccreditation Information'
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    <img
                                        src={BbbLogo}
                                        alt='BBB accredited business'
                                        width='170'
                                        height='45'
                                    />
                                </a>
                            </div>
                            */}
						</Grid>
					</Grid>
				)}
			</section>
			<div className='credit-bar'>
				<p className='ft-credits'>
					Design and Dev by{' '}
					<a href='https://ferociousmedia.com' target='_blank' rel='noreferrer'>
						Ferocious Media
					</a>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
