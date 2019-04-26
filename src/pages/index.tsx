import * as React from 'react';
import { CSCMApp } from 'CSCMApp';
import { nav, Page, VPage, Controller } from 'tonva-tools';
import { AppUI, CApp, VTuidEdit, VTuidMain, CLink } from 'tonva-react-uq';
import { consts } from 'home/consts';
import {TestPage2} from './testpage2'
import { CarouselControlProps } from 'reactstrap';

const baseInfoNames : string[] = [
  "product", "packtype", "供应商信息", "客户信息", "部门信息", "职员信息", "库区信息",
   "货位信息", "物流中心", "生产厂商"
]

const sheetNames : string[] = [
  "采购订单", "采购收货"
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

class NavTuidEditPage extends VPage<CApp> {
  async open(param?: any) {
    if (param !== undefined) {
      let cuq = this.controller.getCUq(consts.uqBasedata);
      let mid = cuq.tuid(param);
      if (mid !== undefined) {
        await cuq.cTuidEdit(mid).start();
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

const showOneVPage = async(cApp:Controller, vp: new (coordinator: Controller) => VPage<Controller>, param?: any): Promise<void> => {
  await (new vp(cApp)).open(param);
}

export const navToPage = (name : string, cApp : Controller) => {
  if (baseInfoNames.includes(name)) {
    showOneVPage(cApp, NavTuidMainPage, name);
  }
  else if (sheetNames.includes(name)) {
    showOneVPage(cApp, NavSheetPage, name);
  }
  else if (name === "testAllTab")
  {
    showOneVPage(cApp, TestPage2, "testAllTab")
  }
}

export const navToEditPage = (name : string, cApp : Controller) => {
  if (baseInfoNames.includes(name)) {
    showOneVPage(cApp, NavTuidEditPage, name);
  }
}