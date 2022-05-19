import React from 'react';
import Routes from './Routes';
import DynamicSitemap from 'react-dynamic-sitemap';

const Sitemap = (props) => {
    return (
        <section>
            <DynamicSitemap routes={Routes} prettify={true} {...props} />
        </section>
    );
};

export default Sitemap;
