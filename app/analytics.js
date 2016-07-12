import ReactGA from 'react-ga';

const GA_TRACKING_ID = 'UA-80651411-1';
const IS_PROD = (process.env.NODE_ENV === 'production');

if (IS_PROD) {
  ReactGA.initialize(GA_TRACKING_ID);
}

export function logPageView() {
  if (!IS_PROD) {
    return;
  }
  
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}