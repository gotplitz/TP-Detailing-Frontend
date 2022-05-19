import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// CSS
import './Services/Services.css';

// Parts
import ScrollToTop from './Extras/ScrollToTop';
import Spinning from './Extras/Spinning';
import PostTitle from './Blog/PostTitle';
import PostBody from './Blog/PostBody';
import HomeContact from './Home/HomeContact';
import HelmetMetaData from './HelmetMetaData';

const PostPage = ({ match }) => {
    const [postContent, setPostcontent] = useState({
        _id: '',
        date: '',
        featuredimg: '',
        newstitle: '',
        newslink: '',
        newsintro: '',
        newscontent: '',
        imgw: '',
        imgh: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function GetData() {
            await axios
                .get('https://admin.gettpd.com/api/noticias')
                .then((res) =>
                    res.data.map((rd) => {
                        if (
                            rd.newslink === match.params.newslink &&
                            rd.newsstatus
                        ) {
                            let img = new Image();
                            img.src = `https://admin.gettpd.com/uploads/${rd.featuredimg}`;
                            img.onload = () => {
                                setPostcontent({
                                    _id: rd._id,
                                    newstitle: rd.newstitle,
                                    newsintro: rd.newsintro,
                                    newscontent: rd.newscontent,
                                    date: rd.date,
                                    featuredimg: img.src,
                                    imgw: img.width,
                                    imgh: img.height,
                                    newslink: rd.newslink,
                                });
                            };
                        }
                        return setLoading(false);
                    })
                );
        }

        return GetData();

        // eslint-disable-next-line
    }, [match.params.newslink]);

    return (
        <div className='news-body news-us'>
            <ScrollToTop />
            <HelmetMetaData
                title={`${postContent.newstitle}`}
                description={postContent.newsintro.substring(0, 200)}
                image={postContent.featuredimg}
            ></HelmetMetaData>

            {loading ? (
                <section>
                    <Spinning />
                </section>
            ) : (
                <Fragment>
                    {postContent.newstitle === '' &&
                    postContent.newscontent === '' ? (
                        <div className='page-body not-found'>
                            <ScrollToTop />
                            <section>
                                <h1>
                                    <i className='fas fa-exclamation-triangle'></i>{' '}
                                    404
                                </h1>
                                <p style={{ marginBottom: 50 }}>
                                    {' '}
                                    The page you are trying to access doesn't
                                    exist.
                                </p>
                                <div className='button-read-more'>
                                    <Link to='/'>Back to Home</Link>
                                </div>
                            </section>
                        </div>
                    ) : (
                        <Fragment>
                            <PostTitle
                                img={postContent.featuredimg}
                                title={postContent.newstitle}
                                date={postContent.date}
                            />
                            <PostBody
                                img={postContent.featuredimg}
                                title={postContent.newstitle}
                                width={postContent.imgw}
                                height={postContent.imgh}
                                intro={postContent.newsintro}
                                content={postContent.newscontent}
                            />
                            <HomeContact />
                        </Fragment>
                    )}
                </Fragment>
            )}
        </div>
    );
};

export default PostPage;
