import type { ElementRef, ElementType } from 'react';

declare var $ : any;
declare var jQuery : any;
declare var mw : any;
declare var OO : any;
declare var ve : any;

declare type ReactObjRef<ET: ElementType> = {
  current : null | ElementRef< ET >
};
