import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

// Components
import HomePage from './Components/HomePage';
import AboutPage from './Components/AboutPage';
import PricingPage from './Components/PricingPage';
import BlogPage from './Components/BlogPage';
import GalleryPage from './Components/GalleryPage';
import ContactPage from './Components/ContactPage';
import PostPage from './Components/PostPage';
import ServicesPage from './Components/ServicesPage';
import Sitemap from './Sitemap';
import NotFound from './Components/Layout/NotFound';
import Spinning from './Components/Extras/Spinning';
import ThankYou from './Components/ThankYou';

const Routes = () => {
    const [about, setAbout] = useState();
    const [pricing, setPricing] = useState();
    const [blog, setBlog] = useState();
    const [gallery, setGallery] = useState();
    const [contacts, setContacts] = useState();
    const [sslugs, setSslugs] = useState([]);
    const [pslugs, setPslugs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const GetData = async () => {
            const PagesLinks = await axios.get(
                'https://admin.gettpd.com/api/pages'
            );
            const ServicessLinks = await axios.get(
                'https://admin.gettpd.com/api/services'
            );
            const PostssLinks = await axios.get(
                'https://admin.gettpd.com/api/noticias'
            );

            Promise.all([PagesLinks, ServicessLinks, PostssLinks]).then(
                (res) => {
                    res[0].data.forEach((element) => {
                        if (element.menuname === 'About Us') {
                            setAbout(element.pagelink);
                        }
                    });
                    res[0].data.forEach((element) => {
                        if (element.menuname === 'Pricing') {
                            setPricing(element.pagelink);
                        }
                    });
                    res[0].data.forEach((element) => {
                        if (element.menuname === 'Blog') {
                            setBlog(element.pagelink);
                        }
                    });
                    res[0].data.forEach((element) => {
                        if (element.menuname === 'Gallery') {
                            setGallery(element.pagelink);
                        }
                    });
                    res[0].data.forEach((element) => {
                        if (element.menuname === 'Contact Us') {
                            setContacts(element.pagelink);
                        }
                    });
                    setSslugs(res[1].data);
                    setPslugs(res[2].data);
                    setLoading(false);
                }
            );
        };

        return GetData();
    }, []);

    var allservices = [];
    var allposts = [];
    sslugs &&
        sslugs.length > 0 &&
        sslugs.map((bp) => allservices.push({ servicelink: bp.servicelink }));
    pslugs &&
        pslugs.length > 0 &&
        pslugs.map((bp) => allposts.push({ newslink: bp.newslink }));

    return (
        <Switch>
            <Route
                exact
                path='/'
                component={HomePage}
                sitemapIndex='true'
                changefreq='monthly'
                priority='1'
            />
            <Route
                exact
                path={`/${about && about}`}
                component={AboutPage}
                sitemapIndex='true'
                changefreq='monthly'
                priority='1'
            />
            <Route
                exact
                path={`/${pricing && pricing}`}
                component={PricingPage}
                sitemapIndex='true'
                changefreq='monthly'
                priority='1'
            />
            <Route
                exact
                path={`/${blog && blog}`}
                component={BlogPage}
                sitemapIndex='true'
                changefreq='monthly'
                priority='1'
            />
            <Route
                exact
                path={`/${gallery && gallery}`}
                component={GalleryPage}
                sitemapIndex='true'
                changefreq='monthly'
                priority='1'
            />
            <Route
                exact
                path={`/${contacts && contacts}`}
                component={ContactPage}
                sitemapIndex='true'
                changefreq='monthly'
                priority='1'
            />
            <Route exact path='/sitemap' component={Sitemap} />
            <Route exact path='/thank-you' component={ThankYou} />
            <Route
                exact
                path='/services/:servicelink'
                component={ServicesPage}
                sitemapIndex='true'
                priority='1'
                slugs={allservices}
            />
            <Route
                exact
                path='/blog/:newslink'
                component={PostPage}
                sitemapIndex='true'
                priority='1'
                slugs={allposts}
            />
            {loading ? <Spinning /> : <Route exact component={NotFound} />}
        </Switch>
    );
};

export default Routes;
