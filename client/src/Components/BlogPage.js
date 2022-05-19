import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

// css
import './Pricing/pricing.css';

// Parts
import ScrollToTop from './Extras/ScrollToTop';
import Spinning from './Extras/Spinning';
import PagesTitle from './Layout/PagesTitle';
import BlogPosts from './Blog/BlogPosts';
import HelmetMetaData from './HelmetMetaData';

const BlogPage = () => {
    const [blogcontent, setBlogcontent] = useState({
        featuredimg: '',
        pagetitle: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const GetData = async () => {
            await axios
                .get('https://admin.gettpd.com/api/pages')
                .then((res) => {
                    res.data.filter(
                        (data) =>
                            data.menuname === 'Blog' &&
                            setBlogcontent({
                                featuredimg: data.featuredimg,
                                pagetitle: data.pagetitle,
                            }),
                        setLoading(false)
                    );
                });
        };

        return GetData();

        // eslint-disable-next-line
    }, []);

    return (
        <div className='page-body blog-page'>
            <ScrollToTop />
            <HelmetMetaData
                title={blogcontent.pagetitle}
                image={blogcontent.featuredimg}
            ></HelmetMetaData>

            {loading ? (
                <section>
                    <Spinning />
                </section>
            ) : (
                <Fragment>
                    <PagesTitle
                        img={blogcontent.featuredimg}
                        title={blogcontent.pagetitle}
                    />
                    <BlogPosts />
                </Fragment>
            )}
        </div>
    );
};

export default BlogPage;
