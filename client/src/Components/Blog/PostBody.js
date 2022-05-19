import { Grid } from '@mui/material';
import React from 'react';

// Parts
import Sidebar from '../Layout/Sidebar';

const PostBody = ({ img, title, width, height, intro, content, date }) => {
	return (
		<div className='post-body'>
			<section>
				<Grid container spacing={7}>
					<Grid item xs={12} sm={12} md={8}>
						<div className='image-container'>
							<img src={img} alt={title} width={width} height={height} />
						</div>
						<div className='post-body'>
							<div
								className='post-intro'
								dangerouslySetInnerHTML={{ __html: intro }}
							></div>
							<div
								className='post-content'
								dangerouslySetInnerHTML={{ __html: content }}
							></div>
						</div>
					</Grid>
					<Grid item xs={12} sm={12} md={4}>
						<Sidebar title={title} />
					</Grid>
				</Grid>
			</section>
		</div>
	);
};

export default PostBody;
