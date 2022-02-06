import '@babel/polyfill';

/*
import LazyLoad from "vanilla-lazyload";
var myLazyLoad = new LazyLoad();
*/

import 'lazysizes/lazysizes.min';

import Gallery from './components/Gallery';
import {init as initGoogleMaps} from './components/GoogleMap';
import {init as initNavMenu} from './components/NavMenu';

Gallery.init();
initGoogleMaps();
initNavMenu();

//

/*

import {init as initContactForm} from './components/ContactForm';


*/



// initContactForm()
