import * as React from 'react';
import { CSCMApp } from 'CSCMApp';
import { nav, Page, VPage, Controller } from 'tonva-tools';
import { AppUI, CApp, VTuidEdit, VTuidMain, CLink } from 'tonva-react-uq';
import { consts } from 'home/consts';
import {TestPage2} from './testpage2'

const baseInfoNames : string[] = [
  "product", "supplier", "customer", "department", "staff", "warehouse", "goodslocation"
]

const sheetNames : string[] = [
  "purchase"
]

class NavTuidMainPage extends VPage<CApp> {
  async open(param?: any) {
    if (param !== undefined) {
      let cuq = this.controller.getCUq(consts.uqBasedata);
      let mid = cuq.tuid(param);
      if (mid !== undefined) {
        await cuq.cTuidMain(mid).start();
      }
    }
  }
}

class NavSheetPage extends VPage<CApp> {
  async open(param?: any) {
    if (param !== undefined) {
      let cuq = this.controller.getCUq(consts.uqBasedata);
      let mid = cuq.sheet(param);
      if (mid !== undefined) {
        await cuq.cSheet(mid).start();
      }
    }
  }
}

export const navToPage = (name : string, cApp : CSCMApp) => {
  if (baseInfoNames.includes(name)) {
    cApp.showOneVPage(NavTuidMainPage, name);
  }
  else if (sheetNames.includes(name)) {
    cApp.showOneVPage(NavSheetPage, name);
  }
  else if (name === "testAllTab")
  {
    cApp.showOneVPage(TestPage2, "testAllTab")
  }
}