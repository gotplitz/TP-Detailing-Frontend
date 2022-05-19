import { Link } from 'react-router-dom';
import React from 'react';

// Pages
import ScrollToTop from './Extras/ScrollToTop';

const ThankYou = () => {
    return (
        <div className='page-body thank-you'>
            <ScrollToTop />
            <section>
                <h1 style={{ marginBottom: 50 }}>
                    <i className='fal fa-thumbs-up'></i> Thank You
                </h1>
                <h2>We Have Received Your Request</h2>
                <p style={{ marginBottom: 50 }}>
                    {' '}
                    Thomas will contact you shortly. If you need immediate
                    assistance please call us at{' '}
                    <a className='phone-body' href='tel:2035514076'>
                        (203) 551-4076.
                    </a>
                </p>
                <div className='button-read-more'>
                    <Link to='/'>Back to Home</Link>
                </div>
            </section>
        </div>
    );
};

export default ThankYou;
