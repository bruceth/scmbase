import * as React from 'react';
import { observer } from 'mobx-react';
import { LMR, Muted } from 'tonva-react-form';
import * as Purchase from './purchase'
import {SheetUI} from 'tonva-react-uq'

const purchase: SheetUI = {
  CSheet: Purchase.CSheetPurchase,
  main: Purchase.VSheetMainPurchase,
  sheetNew: Purchase.VSheetNewPurchase
}

export default {
  //采购订单: purchase,
}