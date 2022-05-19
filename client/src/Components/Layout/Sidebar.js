import axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

// Parts
import Spinning from '../Extras/Spinning';
import Testimonials from '../Extras/Testimonials';

const Sidebar = ({ title }) => {
    const [posts, setPosts] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function GetData() {
            const getPosts = await axios.get(
                'https://admin.gettpd.com/api/noticias'
            );

            const getTesti = await axios.get(
                'https://admin.gettpd.com/api/testimonials'
            );

            Promise.all([getPosts, getTesti]).then((res) => {
                setPosts([]);
                res[0].data.filter(
                    (el) =>
                        el.newstitle !== title &&
                        setPosts((posts) => [
                            ...posts,
                            {
                                _id: el._id,
                                newstitle: el.newstitle,
                                date: el.date,
                                newslink: el.newslink,
                                newsstatus: el.newsstatus,
                            },
                        ])
                );
                setTestimonials(res[1].data);
                setLoading(false);
            });
        }

        return GetData();

        // eslint-disable-next-line
    }, [title]);

    return (
        <div className='sidebar'>
            <section>
                {loading ? (
                    <Spinning />
                ) : (
                    <Fragment>
                        <h4>Latest Posts</h4>
                        {posts &&
                            posts
                                .sort(
                                    (a, b) =>
                                        new Date(a.date) - new Date(b.date)
                                )
                                .slice(0, 5)
                                .map(
                                    (latest) =>
                                        latest.newsstatus && (
                                            <Link
                                                key={latest._id}
                                                to={latest.newslink}
                                                className='sidebar-item-a'
                                            >
                                                <div className='sidebar-item'>
                                                    <h5>{latest.newstitle}</h5>
                                                    <Moment format='MM/DD/yyyy'>
                                                        {latest.date}
                                                    </Moment>
                                                </div>
                                            </Link>
                                        )
                                )}
                        <div className='ht-container'>
                            <h4>Testimonials</h4>

                            <Testimonials testimonials={testimonials} />
                        </div>
                    </Fragment>
                )}
            </section>
        </div>
    );
};

export default Sidebar;
