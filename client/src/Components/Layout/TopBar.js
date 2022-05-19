import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../Images/TP-logo.png';
import SocialNetworks from '../Extras/SocialNetworks';

const TopBar = () => {
	return (
		<div className='top-bar'>
			<section>
				{/* <div className="seasonal-callout">T.P.’s Professional Detailing LLC is taking a seasonal hiatus starting Monday November 29th. We will start operating again on Friday April 1, 2022.</div> */}
				<div className='top-container'>
					<div className='logo-container'>
						<Link to='/'>
							<img
								src={Logo}
								alt='T.P.’s Professional Detailing logo'
								width='375'
								height='121'
							/>
						</Link>
					</div>
					<div className='info-container'>
						<div className='top-blurb'>
							<i className='fal fa-shipping-fast'></i>
							<div className='top-blurb-text'>
								Shelton, CT 06484
								<span style={{ textTransform: 'uppercase' }}>
									Mobile Detailer
								</span>
							</div>
						</div>
						<div className='top-blurb'>
							<i className='fal fa-phone'></i>
							<div className='top-blurb-text'>
								Call Us Now
								<span>
									<a href='tel:2035514076'>(203) 551-4076</a>
								</span>
							</div>
						</div>
						<SocialNetworks />
					</div>
				</div>
			</section>
			<div className='top-bar-bg' style={{ backgroundColor: '#101010' }}></div>
		</div>
	);
};

export default TopBar;
