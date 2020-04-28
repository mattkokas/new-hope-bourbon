'use strict';

import scroll from 'scroll';
import { getTopFromBody } from './PositionUtils';
import scrollDoc from 'scroll-doc';

const page = scrollDoc();

export function scrollTo(element, pad = 0) {
   if (element) {
      let targetPosition = getTopFromBody(element);
      targetPosition += pad;
      scroll.top(page, targetPosition);
   }
}

export default {
   scrollTo: scrollTo
};
