import * as React from 'react';
import { Query } from 'tonva-react-uq';
import { observable } from 'mobx';
import { VRootCategory } from './VRootCategory';
import { VCategory } from './VCategory';
import { CSCMApp } from 'CSCMApp';
import { Controller } from 'tonva-tools';

export interface IFunctionList {
  categoryName: string;
  functionNames: string[];
}

let funcCategories = [
  {
    name: "基础信息",
    id: 1,
    children: [
      { name:"商品信息",
        id: 101,
        pid: 1 }, 
      { name: "供应商信息",
        id: 102,
        pid: 1 },
      { name: "客户信息",
        id: 103,
        pid: 1 },
      { name: "部门信息",
        id: 104,
        pid: 1 },
      { name: "职员信息",
        id: 105,
        pid: 1 },
      { name: "物流中心（自建、委托）",
        id: 106,
        pid: 1 },
      { name: "库区信息（自建）",
        id: 107,
        pid: 1 },
      { name: "货位信息（自建）",
        id: 108,
        pid: 1 }
    ]
  },
  {
    name: "采购管理",
    id: 2,
    children: [
      { name:"采购订单",
        id: 201,
        pid: 2 }, 
      { name: "采购收货（自建）",
        id: 202,
        pid: 2 }, 
      { name: "采购验收（自建）",
        id: 203,
        pid: 2 }, 
      { name: "采购入库（自建）",
        id: 204,
        pid: 2 }, 
      { name: "采购记账",
        id: 205,
        pid: 2 }, 
      { name: "采购退货",
        id: 206,
        pid: 2 }, 
      { name: "采退出库（自建）",
        id: 207,
        pid: 2 }, 
      { name: "采退复核（自建）",
        id: 208,
        pid: 2 }, 
      { name: "采退记账",
        id: 209,
        pid: 2 }
    ]
  },
  {
    name: "采购结算管理",
    id: 3,
    children: [
      { name: "采购发票",
        id: 301,
        pid: 3 }, 
      { name: "采购组票",
        id: 302,
        pid: 3 }, 
      { name: "采购结算",
        id: 303,
        pid: 3 }, 
      { name: "采价调整",
        id: 304,
        pid: 3 }, 
      { name: "采购冲差",
        id: 305,
        pid: 3 }
    ]
  },
  {
    name: "销售管理",
    id: 4,
    children: [
      { name:"销售订单",
        id: 401,
        pid: 4 }, 
      { name: "销售出库（自建）",
        id: 402,
        pid: 4 }, 
      { name: "出库复核（自建）",
        id: 403,
        pid: 4 }, 
      { name: "销售记账（自建、委托）",
        id: 404,
        pid: 4 }, 
      { name: "销售退货",
        id: 405,
        pid: 4 }, 
      { name: "销售退货验收（自建）",
        id: 406,
        pid: 4 }, 
      { name: "销售退货入库（自建）",
        id: 407,
        pid: 4 }, 
      { name: "销售退货记账（自建、委托）",
        id: 408,
        pid: 4 }
    ]
  },
  {
    name: "销售结算管理",
    id: 5,
    children: [
      { name:"销售换票",
        id: 501,
        pid: 5 }, 
      { name: "销售结算",
        id: 502,
        pid: 5 }, 
      { name: "销价调整",
        id: 503,
        pid: 5 }, 
      { name: "销售冲差",
        id: 504,
        pid: 5 }, 
    ]
  },
  {
    name: "期初管理",
    id: 6,
    children: [
      { name:"商品库存期初",
        id: 601,
        pid: 6 }, 
      { name: "供应商期初",
        id: 602,
        pid: 6 }, 
      { name: "客商期初",
        id: 603,
        pid: 6 }, 
    ]
  },
  {
    name: "价格管理",
    id: 7,
    children: [
      { name:"商品定价",
        id: 701,
        pid: 7 }, 
      { name: "客商定价",
        id: 702,
        pid: 7 }, 
    ]
  },
  {
    name: "查询报表",
    id: 8,
    children: [
      { name: "库存相关",
        id: 801,
        pid: 8, 
        children: [
          { name: "库存查询",
            id: 80101,
            pid: 801 },
          { name: "进销存查询",
            id: 80102,
            pid: 801 },
        ]
      }, 
      { name: "销售相关",
        id: 802,
        pid: 8, 
        children: [
          { name: "客商销售汇总查询",
            id: 80201,
            pid: 802 },
          { name: "客商销售明细查询",
            id: 80202,
            pid: 802 }
        ]
      }, 
      { name: "采购相关",
        id: 803,
        pid: 8,
        children: []
      }, 
      { name: "应收应付相关",
        id: 804,
        pid: 8,
        children: [
          { name: "客商应收账款汇总查询",
            id: 80401,
            pid: 804 },
          { name: "客商应收账款明细查询",
            id: 80402,
            pid: 804 },
          { name: "供应商应付账款汇总查询",
            id: 80403,
            pid: 804 },
          { name: "供应商应付账款明细查询",
            id: 80404,
            pid: 804 }
        ]
      }, 
    ]
  }
]

export class CFunctionCategory extends Controller {

  cApp: CSCMApp;
  // categories: any[];
  @observable categories: any[] = [];

  constructor(cApp: CSCMApp, res: any) {
    super(res);

    this.cApp = cApp;
  }

  async internalStart(param: any) {
    this.categories = funcCategories;
  }

  renderRootList = () => {
    return this.renderView(VRootCategory);
  };

  async openMainPage(categoryWaper: any, parent: any) {
    if (categoryWaper === undefined)
      return;
    let { children } = categoryWaper;
    if (children === undefined || children.length == 0)
      return;
    this.openVPage(VCategory, { categoryWaper, parent });
  }
}