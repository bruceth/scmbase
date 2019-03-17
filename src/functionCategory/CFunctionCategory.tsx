import * as React from 'react';
import { Query } from 'tonva-react-uq';
import { observable } from 'mobx';
import { VRootCategory } from './VRootCategory';
import { VCategory } from './VCategory';
import { CSCMApp } from 'CSCMApp';
import { nav, Page, Loading, Controller } from 'tonva-tools';
import { funcs } from './funcCategories';
import { navToPage } from 'pages'

export class CFunctionCategory extends Controller {

  cApp: CSCMApp;
  // categories: any[];
  @observable categories: any[] = [];

  constructor(cApp: CSCMApp, res: any) {
    super(res);

    this.cApp = cApp;
  }

  async internalStart(param: any) {
    this.categories = funcs;
  }

  renderRootList = () => {
    return this.renderView(VRootCategory);
  };

  async openMainPage(categoryWaper: any, parent: any) {
    if (categoryWaper === undefined)
      return;
    let { children, page, name } = categoryWaper;
    if (children === undefined || children.length == 0) {
      
      if (page !== undefined) {
        navToPage(page, this.cApp);
      }
    }
    else {
      this.openVPage(VCategory, { categoryWaper, parent });
    }
  }
}