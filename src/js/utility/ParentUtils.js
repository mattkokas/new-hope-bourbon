'use strict';

import { hasClass } from './ClassnameUtils';


export function getParentByTag (element, tag) {
   if (!element || !tag) {
      return null;
   }

   tag = tag.toLowerCase();

   while (element.parentNode) {
      element = element.parentNode;

      if (element && element.tagName && element.tagName.toLowerCase() === tag) {
         return element;
      }
   }

   return null;
}


export function getParentByClass (element, className) {
   if (!element || !className) {
      return null;
   }

   while (element.parentNode) {
      element = element.parentNode;

      if (element && hasClass(element, className)) {
         return element;
      }
   }

   return null;
}


export function getParentByAttr (element, attr) {
   if (!element || !attr) {
      return null;
   }

   while (element.parentNode) {
      element = element.parentNode;

      if (element && element.hasAttribute(attr)) {
         return element;
      }
   }

   return null;
}


export default {
   getParentByTag: getParentByTag,
   getParentByClass: getParentByClass,
   getParentByAttr: getParentByAttr
};
