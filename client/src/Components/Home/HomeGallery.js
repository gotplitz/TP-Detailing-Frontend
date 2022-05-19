import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GalleryCarrousel from '../Extras/GalleryCarrousel';
import Spinning from '../Extras/Spinning';

// Static Images
import SmallGears from '../../Images/gears.png';
import GearsBg from '../../Images/gears-black-bg.jpg';

const HomeGallery = ({ gallery, title }) => {
	const [ImgDim, setImgDim] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function GetDims() {
			setImgDim([]);
			for (let i = 0; i < gallery.length; i++) {
				let img = new Image();
				img.src = `https://admin.gettpd.com/uploads/${gallery[i].fileName}`;
				img.onload = () => {
					let ratioh = (350 * img.height) / img.width;
					setImgDim((ImgDim) => [
						...ImgDim,
						{
							src: img.src,
							width: img.width,
							height: img.height,
							twidth: 350,
							theight: ratioh,
						},
					]);
				};

				if (i + 1 === gallery.length) {
					setLoading(false);
				}
			}
		}

		return GetDims();
	}, [gallery, title]);

	return (
		<div className='home-gallery'>
			<section>
				<Grid container spacing={0}>
					<Grid item xs={12}>
						<div className='centered-title'>
							<h3>Our Work</h3>
						</div>
					</Grid>
				</Grid>
			</section>
			{loading ? <Spinning /> : <GalleryCarrousel gallery={ImgDim} />}
			<div className='gears-center-bg'>
				<img
					src={SmallGears}
					width='628px'
					height='405px'
					alt='gears background'
				/>
			</div>
			<div className='black-gears'>
				<img src={GearsBg} width='1920' height='275' alt='gears background' />
			</div>
		</div>
	);
};

export default HomeGallery;
