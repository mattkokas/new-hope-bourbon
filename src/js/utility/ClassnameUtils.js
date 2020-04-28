'use strict';

export function hasClass(element, className = "") {
   if (element) {
      if (element.classList) {
         return element.classList.contains(className);
      }
      else {
         return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
      }
   }

   return false;
}

export function addClass(element, className = "") {
   if (element) {
      if (element.classList) {
         element.classList.add(className);
      }
      else {
         element.className += ` ${className}`;
      }
   }
}

export function removeClass(element, className = "") {
   if (element) {
      if (element.classList) {
         element.classList.remove(className);
      }
      else {
         element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      }
   }
}


export function toggleClass(element, className = "") {
   let classes,
       existingIndex;

   if (element) {
      if (element.classList) {
         element.classList.toggle(className);
      }
      else {
         classes = element.className.split(' ');
         existingIndex = classes.indexOf(className);

         if (existingIndex >= 0) {
            classes.splice(existingIndex, 1);
         }
         else {
            classes.push(className);
         }

         element.className = classes.join(' ');
      }
   }
}

export default {
   hasClass: hasClass,
   addClass: addClass,
   removeClass: removeClass,
   toggleClass: toggleClass
};
