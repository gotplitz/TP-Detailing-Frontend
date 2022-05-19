import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

export default function HelmetMetaData(props) {
    let location = useLocation();
    let currentUrl = 'https://gettpd.com' + location.pathname;
    let quote = props.quote !== undefined ? props.quote : '';
    let title =
        props.title !== undefined
            ? props.title
            : `T.P.'s Professional Detailing | Mobile Detailer in Shelton, CT area`;
    let image =
        props.image !== ''
            ? `https://admin.gettpd.com/uploads/${props.image}`
            : 'https://admin.gettpd.com/uploads/tp-company-van-0.jpg';
    let description =
        props.description !== undefined
            ? props.description.replace(/<[^>]+>/g, '')
            : 'If you need a reliable, trustworthy detailer in Connecticut, T.P.’s Professional Detailing is the name to know and trust. We take the time to ensure that every detail of your vehicle has been catered...';
    let hashtag = props.hashtag !== undefined ? props.hashtag : '#tpsdetailing';

    return (
        <Helmet
            encodeSpecialCharacters={true}
            titleTemplate={`%s | Mobile Detailer in Shelton, CT area`}
            defaultTitle={`T.P.'s Professional Detailing`}
        >
            <title>{title}</title>
            <meta charset='utf-8' />
            <meta http-equiv='X-UA-Compatible' content='IE=edge' />
            <meta name='csrf_token' content='' />
            <meta property='type' content='website' />
            <meta property='url' content={currentUrl} />

            <meta
                name='viewport'
                content='width=device-width, initial-scale=1, shrink-to-fit=no'
            />
            <meta name='msapplication-TileColor' content='#e91751' />

            <meta name='theme-color' content='#e91751' />
            <meta name='_token' content='' />
            <meta name='robots' content='noodp' />
            <meta property='title' content={title} />
            <meta property='quote' content={quote} />
            <meta name='description' content={description} />
            <meta property='image' content={image} />
            <meta property='og:locale' content='en_US' />
            <meta property='og:type' content='website' />
            <meta property='og:title' content={title} />
            <meta property='og:quote' content={quote} />
            <meta property='og:hashtag' content={hashtag} />
            <meta property='og:image' content={image} />
            <meta content='image/*' property='og:image:type' />
            <meta property='og:url' content={currentUrl} />
            <meta property='og:site_name' content={`TP's Detailing`} />
            <meta property='og:description' content={description} />

            <meta name='msapplication-TileColor' content='#e91751' />

            <link
                rel='apple-touch-icon'
                sizes='180x180'
                href='/icons/apple-touch-icon.png'
            />
            <link
                rel='icon'
                type='image/png'
                sizes='32x32'
                href='/icons/favicon-32x32.png'
            />
            <link
                rel='icon'
                type='image/png'
                sizes='194x194'
                href='/icons/favicon-194x194.png'
            />
            <link
                rel='icon'
                type='image/png'
                sizes='192x192'
                href='/icons/android-chrome-192x192.png'
            />
            <link
                rel='icon'
                type='image/png'
                sizes='16x16'
                href='/icons/favicon-16x16.png'
            />
            <link rel='manifest' href='/icons/site.webmanifest' />
            <link rel='shortcut icon' href='/icons/favicon.ico' />
            <meta
                name='apple-mobile-web-app-title'
                content="T.P.'s Detailing"
            />
            <meta name='application-name' content="T.P.'s Detailing" />

            <meta
                name='msapplication-TileImage'
                content='/icons/mstile-144x144.png'
            />
            <meta
                name='msapplication-config'
                content='/icons/browserconfig.xml'
            />

            <link rel='preconnect' href='https://fonts.googleapis.com' />
            <link
                rel='preconnect'
                href='https://fonts.gstatic.com'
                crossorigin
            />
            <link
                rel='preload'
                as='style'
                href='https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap'
                onLoad="this.rel='stylesheet'"
            />
        </Helmet>
    );
}
