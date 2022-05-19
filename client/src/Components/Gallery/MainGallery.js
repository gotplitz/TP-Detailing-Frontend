import React from 'react';
import { useRef } from 'react';
import { Grid } from '@mui/material';

import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';

import { CustomGallery, Item, DefaultLayout } from 'react-photoswipe-gallery';
import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';

import './gallery.css';

const MainGallery = ({ gallery }) => {
	const layoutRef = useRef();

	return (
		<div className='gallery-section'>
			<CustomGallery layoutRef={layoutRef} ui={PhotoswipeUIDefault}>
				<section>
					<Grid container spacing={5} justifyContent='center'>
						{gallery &&
							gallery
								.sort((a, b) => a._id - b._id)
								.map((item, index) => (
									<Grid key={index} item xs={12} sm={6} md={3}>
										<div className='projectwrap'>
											<Item
												original={item.src}
												thumbnail={item.src}
												width={item.width}
												height={item.height}
											>
												{({ ref, open }) => (
													<img
														ref={ref}
														onClick={open}
														src={item.src}
														width={item.twidth}
														height={item.theight}
														alt={`Item ${index}`}
														lazyload='true'
													/>
												)}
											</Item>
										</div>
									</Grid>
								))}
					</Grid>
				</section>
			</CustomGallery>
			<DefaultLayout
				fullscreenButton={false}
				zoomButton={false}
				ref={layoutRef}
			/>
		</div>
	);
};

export default MainGallery;
