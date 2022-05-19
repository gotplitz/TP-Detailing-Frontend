import React, { useEffect } from 'react';

const PagesTitle = ({ img, title }) => {
    useEffect(() => {
        function paral() {
            let theOffset = window.pageYOffset;
            let oneHalf = document.getElementById('top-img');
            let limit = '';

            if (oneHalf !== null) {
                limit = oneHalf.offsetTop + oneHalf.offsetHeight;
            }

            if (theOffset > 10 && oneHalf !== null) {
                oneHalf.style.transform =
                    'translateY(' + (-50 - (theOffset * 25) / limit) + '%)';
            }
        }

        document.addEventListener('scroll', paral, true);

        return () => {
            document.removeEventListener('scroll', paral, true);
        };
    }, [title]);

    return (
        <div className='internal-pages-title'>
            <section>
                <h1>{title}</h1>
            </section>
            <div className='top-overlay'></div>
            <div
                id='top-img'
                className='internal-pages-bg'
                style={{
                    backgroundImage: `url(https://admin.gettpd.com/uploads/${img})`,
                }}
            ></div>
        </div>
    );
};

export default PagesTitle;
