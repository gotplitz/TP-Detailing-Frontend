import { Grid } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

// Parts
import Spinning from '../Extras/Spinning';

const HomePosts = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function GetData() {
			await axios.get('https://admin.gettpd.com/api/noticias').then((res) => {
				setPosts([]);
				res.data.forEach((el) => {
					let img = new Image();
					img.src = `https://admin.gettpd.com/uploads/${el.featuredimg}`;
					img.onload = () => {
						let ratioh = (500 * img.height) / img.width;

						setPosts((posts) => [
							...posts,
							{
								_id: el._id,
								newstitle: el.newstitle,
								newsintro: el.newsintro,
								date: el.date,
								featuredimg: img.src,
								imgw: 500,
								imgh: ratioh,
								newslink: el.newslink,
								newsstatus: el.newsstatus,
							},
						]);
					};
				});
				setLoading(false);
			});
		}

		return GetData();

		// eslint-disable-next-line
	}, []);

	return (
		<div className='home-latest-posts'>
			<section>
				<Grid container>
					<Grid item xs={12}>
						<div className='centered-title'>
							<h3>Latest News</h3>
						</div>
					</Grid>
				</Grid>
				{loading ? (
					<Spinning />
				) : (
					<Grid
						container
						justifyContent='center'
						spacing={5}
						alignItems='stretch'
					>
						{posts && posts.length > 0 ? (
							posts
								.sort((a, b) => new Date(a.date) - new Date(b.date))
								.slice(0, 3)
								.map(
									(bp) =>
										bp.newsstatus && (
											<Grid item xs={12} sm={6} md={4} key={bp._id}>
												<div className='hp-item'>
													<div className='hp-item-img'>
														<img
															src={bp.featuredimg}
															alt={bp.newstitle}
															width={bp.imgw}
															height={bp.imgh}
														/>
													</div>
													<div className='hp-item-content'>
														<Moment format='MMMM DD, YYYY'>{bp.date}</Moment>
														<h6
															dangerouslySetInnerHTML={{
																__html: bp.newstitle,
															}}
														></h6>
														<div
															className='hp-item-intro'
															dangerouslySetInnerHTML={{
																__html: bp.newsintro,
															}}
														></div>
													</div>
													<div className='hp-button-container'>
														<Link
															to={`/blog/${bp.newslink}`}
															className='fm-button'
														>
															<span>Read More</span>
														</Link>
													</div>
												</div>
											</Grid>
										)
								)
						) : (
							<div className='centered-title'>
								<p>No post were found</p>
							</div>
						)}
					</Grid>
				)}
				<Grid item xs={12}>
					<div
						className='button-container'
						style={{
							justifyContent: 'center',
							paddingTop: 50,
						}}
					>
						<Link to='/blog' className='fm-button'>
							<span>Visit Our Blog</span>
						</Link>
					</div>
				</Grid>
			</section>
		</div>
	);
};

export default HomePosts;
