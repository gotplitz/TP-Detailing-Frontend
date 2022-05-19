import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Routes from './Routes';

// Styles
import './App.css';
import TopBar from './Components/Layout/TopBar';
import Footer from './Components/Layout/Footer';
import Spinning from './Components/Extras/Spinning';
import MenuBar from './Components/Layout/MenuBar';

const helmetContext = {};

const App = () => {
    return (
        <HelmetProvider context={helmetContext}>
            <Router>
                <TopBar />
                <MenuBar />
                <Suspense fallback={<Spinning />}>
                    <Routes />
                </Suspense>
                <Footer />
            </Router>
        </HelmetProvider>
    );
};

export default App;
