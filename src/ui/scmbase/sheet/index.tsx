import * as React from 'react';
import { observer } from 'mobx-react';
import { LMR, Muted } from 'tonva-react-form';
import * as Purchase from './purchase'
import * as Receive from './receive'
import {SheetUI} from 'tonva-react-uq'

const purchase: SheetUI = {
  CSheet: Purchase.CSheetPurchase,
  main: Purchase.VSheetMainPurchase,
  sheetNew: Purchase.VSheetNewPurchase
}

const receive: SheetUI = {
  CSheet: Receive.CSheetReceive,
  main: Receive.VSheetMainReceive,
  sheetNew: Receive.VSheetNewReceive
}

export default {
  //采购订单: purchase,
  采购收货: receive,
}