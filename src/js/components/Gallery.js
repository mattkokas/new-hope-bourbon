'use strict';

import {addClass, removeClass, hasClass} from '../utility/ClassnameUtils';

const EXPANDED_STATE = 'state--expanded';
const COLLAPSED_STATE = 'state--collapsed';
const LIGHTBOX_STATE = 'state--lightbox-visible';
const BODY_STATE = 'state--lightbox';

const KEY_CODES = {
   ESCAPE: 27,
   RIGHT_ARROW: 39,
   LEFT_ARROW: 37,
   UP_ARROW: 38,
   DOWN_ARROW: 40,
   SPACE_BAR: 32,
   PAGE_UP: 33,
   PAGE_DOWN: 34,
   HOME: 36,
   END: 35
};

export class Gallery {
   toggleExpandCollapseTrack() {
      if (hasClass(this.props.gallery, EXPANDED_STATE)) {
         removeClass(this.props.gallery, EXPANDED_STATE);
         addClass(this.props.gallery, COLLAPSED_STATE);
         //removeClass(this.props.expanderContainer, EXPANDED_STATE);
         //addClass(this.props.expanderContainer, COLLAPSED_STATE);
      }
      else {
         addClass(this.props.gallery, EXPANDED_STATE);
         removeClass(this.props.gallery, COLLAPSED_STATE);
         //addClass(this.props.expanderContainer, EXPANDED_STATE);
         //removeClass(this.props.expanderContainer, COLLAPSED_STATE);
      }
   }

   _setupExpanderCollapserElements() {
      /*
      if (!this.props.expanderContainer) {
        this.props.expanderContainer =  this.props.gallery.querySelector('.expander');
      }

      if (!this.props.expander && this.props.expanderContainer) {
         this.props.expander =  this.props.expanderContainer.querySelector('.gallery__expander__btn');
      }

      if (!this.props.collapser && this.props.expanderContainer) {
         this.props.collapser = this.props.expanderContainer.querySelector('.expander__hide__trigger');
      }

      if (this.props.expander) {
         this.props.expander.addEventListener('click', ev => {
            ev.preventDefault();
            ev.stopPropagation();
            this.toggleExpandCollapseTrack();
         });
      }

      if (this.props.collapser) {
         this.props.collapser.addEventListener('click', ev => {
            ev.preventDefault();
            ev.stopPropagation();
            this.toggleExpandCollapseTrack();
         });
      }
      */

      if (!this.props.expander) {
         this.props.expander =  this.props.gallery.querySelector('.gallery__expander__btn');
      }

      if (this.props.expander) {
         this.props.expander.addEventListener('click', ev => {
            ev.preventDefault();
            ev.stopPropagation();
            this.toggleExpandCollapseTrack();

            this.props.expander.style.display = 'none';
         });
      }
   }

   imageSelect(index) {
      const item = this.props.items[index];

      this.props.activeIndex = index;

      if (this.props.lightboxImg) {
         this.props.lightboxIsVisible = true;
         this.props.lightboxImg.src = item.href;
         addClass(this.props.gallery, LIGHTBOX_STATE);
         addClass(document.body, BODY_STATE);
      }
   }

   closeLightbox() {
      if (this.props.gallery) {
         this.props.lightboxIsVisible = false;
         removeClass(this.props.gallery, LIGHTBOX_STATE);
         removeClass(document.body, BODY_STATE);
         this.props.lightboxImg.src = "";
      }
   }

   nextImg() {
      let index = this.props.activeIndex + 1;

      if (index >= this.props.count) {
         index = 0;
      }

      this.imageSelect(index);
   }

   prevImg() {
      let index = this.props.activeIndex - 1;

      if (index < 0) {
         index = this.props.count - 1;
      }

      this.imageSelect(index);
   }

   handleKeyDown(ev) {
      const keyCode = ev && ev.keyCode ? ev.keyCode : null;

      if (!this.props.lightboxIsVisible) {
         return;
      }

      switch (keyCode) {
         case KEY_CODES.ESCAPE:
            this.closeLightbox();
            break;

         case KEY_CODES.RIGHT_ARROW:
         case KEY_CODES.SPACE_BAR:
         case KEY_CODES.PAGE_UP:
         case KEY_CODES.UP_ARROW:
            this.nextImg();
            ev.preventDefault();
            break;

         case KEY_CODES.LEFT_ARROW:
         case KEY_CODES.PAGE_DOWN:
         case KEY_CODES.DOWN_ARROW:
            this.prevImg();
            ev.preventDefault();
            break;

         case KEY_CODES.HOME:
            this.imageSelect(0);
            ev.preventDefault();
            break;

         case KEY_CODES.END:
            this.imageSelect(this.count -1 >= 0 ? this.count -1 : 0);
            ev.preventDefault();
            break;

         default:
            break;
      }
   }

   _setupItems() {
      const items = this.props.gallery.querySelectorAll('.gallery__track__item a');

      if (items.length) {
         this.props.count = items.length;
         this.props.items = [...items];
      }

      [...items].forEach((item, i) => {
         item.addEventListener('click', ev => {
            ev.preventDefault();
            this.imageSelect(i);
         });
      });
   }

   _setupLigthbox() {
      const lightBox = this.props.gallery.querySelector('.gallery__lightbox');

      if (!this.props.lightboxImg) {
         this.props.lightboxImg = this.props.gallery.querySelector('.gallery__lightbox__img');
      }

      if (!this.props.lightboxClose) {
         this.props.lightboxClose = this.props.gallery.querySelector('.gallery__lightbox__close');
      }

      if (!this.props.lightboxPrev) {
         this.props.lightboxPrev = this.props.gallery.querySelector('.gallery__lightbox__prev');
      }

      if (!this.props.lightboxNext) {
         this.props.lightboxNext = this.props.gallery.querySelector('.gallery__lightbox__next');
      }

      if (!this.props.lightboxImgWrap) {
         this.props.lightboxImgWrap = this.props.gallery.querySelector('.gallery__lightbox__img__wrapper');
      }

      if (this.props.lightboxClose) {
         this.props.lightboxClose.addEventListener('click', ev => {
            ev.preventDefault();
            this.closeLightbox();
         });
      }

      if (this.props.lightboxPrev) {
         this.props.lightboxPrev.addEventListener('click', ev => {
            ev.preventDefault();
            this.prevImg();
         });
      }

      if (this.props.lightboxNext) {
         this.props.lightboxNext.addEventListener('click', ev => {
            ev.preventDefault();
            this.nextImg();
         });
      }

      /* Touch events */
      if (this.props.lightboxImgWrap) {
         this.props.lightboxImgWrap.addEventListener('touchstart', ev => {
            this.xDown = ev.touches[0].clientX;
            this.yDown = ev.touches[0].clientY;
         }, false);

         this.props.lightboxImgWrap.addEventListener('touchmove', ev => {
            if (!this.xDown || !this.yDown ) {
               return;
            }

            let xUp = ev.touches[0].clientX,
                yUp = ev.touches[0].clientY,
                xDiff = this.xDown - xUp,
                yDiff = this.yDown - yUp;

            if (Math.abs(xDiff) > Math.abs(yDiff)) {
               if (xDiff > 0) {
                  this.prevImg();
               }
               else {
                  this.nextImg();
               }
            }

            this.xDown = null;
            this.yDown = null;
         }, false);
      }
   }

   constructor (galleryEl, props = {}) {
      const defaultProps = {
         gallery: galleryEl,
         items: [],
         count: 0,
         activeIndex: 0,
         lightboxIsVisible: false,
         expanderContainer: null,
         expander: null,
         collapser: null,
         lightboxImgWrap: null,
         lightboxImg: null,
         lightboxClose: null,
         lightboxPrev: null,
         lightboxNext: null
      };

      this.props = Object.assign(defaultProps, props);

      this.xDown = null;
      this.yDown = null;

      this._setupExpanderCollapserElements();
      this._setupLigthbox();
      this._setupItems();

      document.body.addEventListener('keydown', this.handleKeyDown.bind(this), true);
   }
}

export function init() {
   const galleries = document.querySelectorAll('.gallery');

   [...galleries].forEach(el => {
      let G = new Gallery(el);
   });
}

export default {
	init: init
};
