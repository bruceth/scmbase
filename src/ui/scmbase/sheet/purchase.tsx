import * as React from 'react';
import { FA } from 'tonva-react-form';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { List, Muted, LMR } from 'tonva-react-form';
import { Page } from 'tonva-tools';
import { VEntity, Sheet, SheetUI, VForm } from "tonva-react-uq";
import { CSheet, VSheetMain, VSheetNew } from "tonva-react-uq";
import { Form, Field, UiSchema, Schema, UiItem, Context, ArrSchema, UiArr, IntSchema, StringSchema, DateSchema, UiTextAreaItem, UiIdItem, ButtonSchema, UiTextItem, NumSchema, UiCustom, nav } from 'tonva-tools';
import { NumberWidget } from 'tonva-tools/ui/form/widgets';

export class CSheetPurchase extends CSheet {
}

export class VSheetMainPurchase extends VEntity<Sheet, SheetUI, CSheetPurchase> {
  async open() {
    this.openPage(this.view);
  }

  newClick = () => this.event('new');
  schemaClick = () => this.event('schema');
  archivesClick = () => this.event('archives');
  sheetStateClick = (state) => this.event('state', state);

  renderState = (item: any, index: number) => {
    let { state, count } = item;
    if (count === 0) return null;
    let badge = <span className="badge badge-success ml-5 align-self-end">{count}</span>;
    return <LMR className="px-3 py-2" left={this.controller.getStateLabel(state)} right={badge} />;
  }

  protected view = observer(() => {
    let list = this.controller.statesCount.filter(row => row.count);
    let right = <button className="btn btn-outline-primary" onClick={this.archivesClick}>已归档</button>;
    let templet: any;
    if (this.isDev === true) {
      templet = <button className="btn btn-primary mr-2" color="primary" onClick={this.schemaClick}>模板</button>;
    }
    return <Page header={this.label}>
      <LMR
        className="mx-3 my-2"
        right={right}>
        <button className="btn btn-primary mr-2" color="primary" onClick={this.newClick}>新建</button>
        {templet}
      </LMR>
      <List className="my-2"
        header={<Muted className="mx-3 my-1">待处理{this.label}</Muted>}
        none="[ 无 ]"
        items={list}
        item={{ render: this.renderState, onClick: this.sheetStateClick }} />
    </Page>;
  });
}

const schemaPurchase : Schema = [
  {name: '供货者', type: 'id', required: true},
  {name: '委托人', type: 'string', required: true, maxLength: 100} as StringSchema,
  {name: '采购员', type: 'id', required: false},
  {name: '签订日期', type: 'date', required: false} as DateSchema,
  {name: '预付金额', type: 'number', required: false},
  {name: '合同号', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '支付方式', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '付款方式', type: 'string', maxLength: 100} as StringSchema,
  {name: '金额合计', type: 'number'},
  {name: '实付金额', type: 'number'},
  {name: '发票类型', type: 'string', maxLength: 100} as StringSchema,
  {name: '交货时间', type: 'date', required: false} as DateSchema,
  {name: '生产经营范围', type: 'string', maxLength: 100} as StringSchema,
  {name: '承运单位', type: 'string', maxLength: 100} as StringSchema,
  {name: '运输方式', type: 'string', maxLength: 100} as StringSchema,
  {name: '承运方式', type: 'string', maxLength: 100} as StringSchema,
  {name: '发货地点', type: 'string', maxLength: 100} as StringSchema,
  {name: '启运时间', type: 'date', required: false} as DateSchema,
  {name: '到货时间', type: 'date', required: false} as DateSchema,
  {
    name: 'products',
    type: 'arr',
    arr: [
      {name: 'product', type:'id', required:true},
      {name: '价格', type: 'number', required:true},
      {name: '数量', type: 'number', required:true},
      {name: '金额', type: 'number', required:true},
    ]
  } as ArrSchema,
  {name: 'submit', type: 'submit'},
];

export class VSheetNewPurchase extends VEntity<Sheet, SheetUI, CSheetPurchase> {
  vForm: VForm;
  formData = {
  }

  protected uiSchema : UiSchema = {
    items : {
      供货者: { widget: 'id'} as UiIdItem,
      委托人: { widget: 'text'} as UiTextItem,
      采购员: { widget: 'id'} as UiIdItem,
      签订日期: { widget: 'date'} as UiItem,
      预付金额: { widget: 'text'} as UiTextItem,
      合同号: { widget: 'text'} as UiTextItem,
      支付方式: { widget: 'text'} as UiTextItem,
      付款方式: { widget: 'text'} as UiTextItem,
      金额合计: { widget: 'text'} as UiTextItem,
      实付金额: { widget: 'text'} as UiTextItem,
      发票类型: { widget: 'text'} as UiTextItem,
      交货时间: { widget: 'date'} as UiItem,
      生产经营范围: { widget: 'text'} as UiTextItem,
      承运单位: { widget: 'text'} as UiTextItem,
      运输方式: { widget: 'text'} as UiTextItem,
      承运方式: { widget: 'text'} as UiTextItem,
      发货地点: { widget: 'text'} as UiTextItem,
      启运时间: { widget: 'date'} as UiItem,
      到货时间: { widget: 'date'} as UiItem,
      submit: {widget: 'button', className: 'btn btn-primary', Templet: <><i className="fa" />&nbsp;确定&nbsp;</>},
      products: {
        widget: 'arr',
        items: {
          product: { widget: 'id'} as UiIdItem,
          价格: { widget: 'custom', WidgetClass: NumberWidget},
          数量: { widget: 'custom', WidgetClass: NumberWidget},
          金额: { widget: 'custom', WidgetClass: NumberWidget},
        },
        Templet: () => <>
        {}
        </>
      } as UiArr,
    },
  }

  //protected get arrView

  async open(param?: any) {
    if (param !== undefined) {
      this.formData = param;
    }
    this.openPage(this.view, param);
  }

  onFormButtonNextClick = async (name:string, context:Context) => {
    if (name === 'submit') {
    }
  }

  protected get view() {
    let {label} = this.controller;
    return () => <Page header={label}>
      <Form className="p-3" schema={schemaPurchase} uiSchema={this.uiSchema} formData={this.formData}
        fieldLabelSize={2}
        onButtonClick={this.onFormButtonNextClick}
      />
    </Page>;
  }

  // private onSubmit = async (): Promise<void> => {
  //   let values = this.vForm.getValues();
  //   let valuesWithBox = this.vForm.values;
  //   //let ret = 
  //   await this.controller.onSave(values, valuesWithBox);
  //   /*
  //   this.ceasePage();
  //   //this.openPage(this.finishedPage);
  //   await this.controller.showSaved(ret);
  //   */
  // }

  // protected view = () => <Page header={this.label}>
  //   {this.vForm.render()}
  // </Page>;
}
