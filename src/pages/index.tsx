import * as React from 'react';
import Loadable from 'react-loadable';
import { CSCMApp } from 'CSCMApp';
import { nav, Page, Loading, Controller } from 'tonva-tools';
import {TestPage} from 'pages/testpage'
import {TestPage2} from 'pages/testpage2'

export const findPage = (name) => {
  if (name === "productTab") {
    return Loadable({
      loader: ()=>import('./product/tab'),
      loading: Loading
    });
  }
  else if (name === "supplierTab") {
    
    return Loadable({
      loader: ()=>import('./supplier/tab'),
      loading: Loading
    });
  }
}

export const navToPage = (name : string, cApp : CSCMApp) => {
  if (name === "productTab") {
    cApp.showOneVPage(TestPage, "商品信息");
  }
  else if (name === "supplierTab")
  {
    cApp.showOneVPage(TestPage2, "供应商信息")
  }
}