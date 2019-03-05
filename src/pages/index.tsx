import * as React from 'react';
import { Loading } from 'tonva-tools';
import Loadable from 'react-loadable';

export const findPage = (name) => {
  if (name === "productTab") {
    return Loadable({
      loader: ()=>import('./product/tab'),
      loading: Loading
    });
  }
}