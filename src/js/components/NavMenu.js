'use strict';

import {addClass, removeClass, toggleClass} from '../utility/ClassnameUtils';
import {scrollTo} from '../utility/Scroller';

const activeStateClass = 'state--nav-open';

export const init = () => {
   const body = document.body;
   const navToggle = document.querySelector('.nav-toggle');
   const nav = document.querySelector('.nav');
   const navAnchors = nav.querySelectorAll('.nav__link');
   
   navToggle.addEventListener('click', ev => {
      ev.preventDefault();
      toggleClass(body, activeStateClass);
   });

   [...navAnchors].forEach(anchor => {
      anchor.addEventListener('click', ev => {
         const hash = ev.target.hash || '';
         

         if (hash) {
            const targetContainer = document.querySelector(hash);
            
            if (targetContainer) {
               ev.preventDefault();
               scrollTo(targetContainer);
            }    
         }
         
         removeClass(body, activeStateClass);
      });
   });
};

export default {
   init: init
};
