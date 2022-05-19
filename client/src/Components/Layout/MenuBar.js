import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

import MainMenu from '../Extras/MainMenu';
import Spinning from '../Extras/Spinning';

const MenuBar = () => {
    const [pages, setPages] = useState();
    const [services, setServices] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function GetNav() {
            const pageslinks = await axios.get(
                'https://admin.gettpd.com/api/pages'
            );
            const serviceslinks = await axios.get(
                'https://admin.gettpd.com/api/services'
            );

            Promise.all([pageslinks, serviceslinks]).then((res) => {
                setPages(res[0].data);
                setServices(res[1].data);
                setLoading(false);
            });
        }
        return GetNav();

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        function paral() {
            var scrollPosition = window.pageYOffset;
            var navbar = document.getElementById('navbar');

            if (scrollPosition > 320) {
                navbar.classList.add('sticky');
            } else {
                navbar.classList.remove('sticky');
            }
        }

        document.addEventListener('scroll', paral, true);

        return () => {
            document.removeEventListener('scroll', paral, true);
        };
    });

    return (
        <Fragment>
            <div className='menu-container'>
                <section>
                    <div className='menu-bar'>
                        {loading ? (
                            <Spinning />
                        ) : (
                            <MainMenu pages={pages} services={services} />
                        )}
                    </div>
                </section>
                <div
                    className='menu-container-bg'
                    style={{ backgroundColor: '#101010' }}
                ></div>
            </div>
            <div id='navbar' className='other-menu'>
                <div
                    className='menu-bar'
                    style={{
                        width: '100%',
                        right: 0,
                        marginTop: 0,
                        padding: '2px 0',
                    }}
                >
                    {loading ? (
                        <Spinning />
                    ) : (
                        <MainMenu pages={pages} services={services} />
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default MenuBar;
