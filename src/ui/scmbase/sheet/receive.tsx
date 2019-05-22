import * as React from 'react';
import { FA } from 'tonva-react-form';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import classNames from 'classnames';
import { List, Muted, LMR } from 'tonva-react-form';
import { Page } from 'tonva-tools';
import { VEntity, Sheet, SheetUI, VForm } from "tonva-react-uq";
import { CSheet, VSheetMain, VSheetNew } from "tonva-react-uq";
import { Form, Field, UiSchema, Schema, UiItem, Context, ArrSchema, UiArr, IntSchema, StringSchema, DateSchema, UiTextAreaItem, UiIdItem, ButtonSchema, UiTextItem, NumSchema, UiCustom, nav } from 'tonva-tools';
import { NumberWidget } from 'tonva-tools/ui/form/widgets';

export class CSheetReceive extends CSheet {
}

export class VSheetMainReceive extends VEntity<Sheet, SheetUI, CSheetReceive> {
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
  {name: '公司机构', type: 'string', required: true, maxLength: 100} as StringSchema,
  {name: '合同单号', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '日期', type: 'date', required: false} as DateSchema,
  {name: '物流中心', type: 'id', required: true},
  {name: '送货人', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '是否空入', type: 'string', maxLength: 10} as StringSchema,
  {name: '单号', type: 'string', required: false, maxLength: 100} as StringSchema,
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

export class VSheetNewReceive extends VEntity<Sheet, SheetUI, CSheetReceive> {
  vForm: VForm;
  formData = {
  }

  ArrContainer = (label:any, content:JSX.Element): JSX.Element => {
    return <div>
        <div className={classNames('small text-muted text-center bg-light py-1 px-3 mt-4 mb-1')}>{label}</div>
        {content}
    </div>;
  }


  protected uiSchema : UiSchema = {
    items : {
      供货者: { widget: 'id'} as UiIdItem,
      公司机构: { widget: 'text'} as UiTextItem,
      合同单号: { widget: 'text'} as UiTextItem,
      日期: { widget: 'text'} as UiTextItem,
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
        label: '商品',
        Templet: () => {
          return <div className="form-inline">
          <Field name="product" />
          <Field name="价格" />
          <Field name="数量" />
          <Field name="n金额" />
        </div>
        },
        ArrContainer: this.ArrContainer,
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
