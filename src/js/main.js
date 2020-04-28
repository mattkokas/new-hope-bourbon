import '@babel/polyfill';

import 'lazysizes/lazysizes.min';

import Gallery from './components/Gallery';
import { init as initGoogleMaps } from './components/GoogleMap';
import { init as initNavMenu } from './components/NavMenu';

Gallery.init();
initGoogleMaps();
initNavMenu();
