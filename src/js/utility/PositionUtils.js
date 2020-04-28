'use strict';

export function getElementPosition(el) {
   let xPosition = 0,
       yPosition = 0;

   while(el) {
      xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
      el = el.offsetParent;
   }

   return {
      x: xPosition,
      y: yPosition
   };
}

export function getTopFromBody(el) {
   /*
   let offsetTop = 0;

   do {
      if (!isNaN(el.offsetTop)) {
         offsetTop += el.offsetTop;
      }
   }
   while(el = el.offsetParent);

   return offsetTop;
   */

   let offsetTop = 0;

   do {
      if (!isNaN(el.offsetTop)) {
         offsetTop += el.offsetTop;
   }

      el = el.offsetParent;
   }
   while(el);

   return offsetTop;
}

export default {
   getElementPosition: getElementPosition,
   getTopFromBody: getTopFromBody
};
