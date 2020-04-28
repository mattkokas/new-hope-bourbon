'use strict';

import {hasClass, toggleClass, removeClass, addClass} from '../utility/ClassnameUtils';


const loadingState = 'state--loading';

const MAP_URI = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6319.564629566482!2d-85.506834!3d37.630808!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88685c0e567f2c87%3A0x9fc5c3d5b40cf142!2s118+Shirley+Ave%2C+New+Hope%2C+KY+40052!5e0!3m2!1sen!2sus!4v1491336287668";

export function init (id) {
   const googleMaps = document.querySelectorAll('.google-map');
   const screenWidth  = window.screen.width;

   let iframes = [];

   if (!googleMaps.length) {
      return;
   }

   [...googleMaps].forEach((map, i) => {
      let height = 400;

      addClass(map, loadingState);

      iframes[i] = document.createElement('iframe');

      if (screenWidth <= 400) {
         height = 300;
      }
      else if (screenWidth <= 959) {
         height = 400;
      }

      iframes[i].height = height;
      iframes[i].width = map.offsetWidth;
      iframes[i].allowFullScreen = true;
      iframes[i].src = MAP_URI;
      map.appendChild(iframes[i]);

      iframes[i].addEventListener('load', () => {
         removeClass(map, loadingState);
      });
      
      /*
      window.addEventListener('resize', () => {
         iframes[i].src = MAP_URI;
      });
      */
   });
}

export default {
   init: init
};
