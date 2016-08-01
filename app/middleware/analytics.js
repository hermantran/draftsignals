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

/*eslint-disable no-unused-vars*/
export const actionLogger = store => next => action => {
/*eslint-enable no-unused-vars*/
  if (IS_PROD) {
    ReactGA.event({
      category: 'User',
      action: action.type || 'Default'
    });
  }

  return next(action);
};
