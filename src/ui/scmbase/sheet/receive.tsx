import * as React from 'react';
import { FA } from 'tonva-react-form';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import classNames from 'classnames';
import { List, Muted, LMR, EasyDate } from 'tonva-react-form';
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
  {name: '公司机构', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '合同单号', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '日期', type: 'date', required: false} as DateSchema,
  {name: '物流中心', type: 'id', required: false},
  {name: '送货人', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '是否空入', type: 'string', maxLength: 10} as StringSchema,
  {name: '单号', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '随货同行单号', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '承运方式', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '委托运输单号', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '发运地点', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '运输单位', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '运输方式', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '运输工具', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '运输状态', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '运输车牌号', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '温控方式', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '温控状态', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '启运温度', type: 'number'},
  {name: '到货温度', type: 'number'},
  {name: '启运时间', type: 'date', required: false} as DateSchema,
  {name: '预到货时间', type: 'date', required: false} as DateSchema,
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

export class VSheetNewReceive extends VEntity<Sheet, SheetUI, CSheetReceive> {
  vForm: VForm;
  formData = {
    单号: undefined,
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
      物流中心: { widget: 'id'} as UiIdItem,
      送货人: { widget: 'text'} as UiTextItem,
      是否空入: { widget: 'text'} as UiTextItem,
      单号: { widget: 'text'} as UiTextItem,
      随货同行单号: { widget: 'text'} as UiItem,
      承运方式: { widget: 'text'} as UiTextItem,
      委托运输单号: { widget: 'text'} as UiTextItem,
      发运地点: { widget: 'text'} as UiTextItem,
      运输单位: { widget: 'text'} as UiTextItem,
      运输方式: { widget: 'text'} as UiTextItem,
      运输工具: { widget: 'text'} as UiTextItem,
      运输状态: { widget: 'text'} as UiTextItem,
      运输车牌号: { widget: 'text'} as UiTextItem,
      温控方式: { widget: 'text'} as UiTextItem,
      温控状态: { widget: 'text'} as UiTextItem,
      启运温度: { widget: 'custom', WidgetClass: NumberWidget} as UiCustom,
      到货温度: { widget: 'custom', WidgetClass: NumberWidget} as UiCustom,
      启运时间: { widget: 'date'} as UiItem,
      到货时间: { widget: 'date'} as UiItem,
      submit: {widget: 'button', className: 'btn btn-primary', Templet: <><i className="fa" />&nbsp;确定&nbsp;</>},
      products: {
        widget: 'arr',
        items: {
          product: { widget: 'id', readOnly:true} as UiIdItem,
          价格: { widget: 'custom', readOnly:true, WidgetClass: NumberWidget},
          数量: { widget: 'custom', readOnly:true, WidgetClass: NumberWidget},
          金额: { widget: 'custom', readOnly:true, WidgetClass: NumberWidget},
        },
        label: '商品',
        Templet: () => {
          return <div className="form-inline">
          <Field name="product" />
          <Field name="价格" />
          <Field name="数量" />
          <Field name="金额" />
        </div>
        },
        ArrContainer: this.ArrContainer,
      } as UiArr,
    },
  }

  
  //protected get arrView

  async open(param?: any) {
    // if (param !== undefined) {
    //   this.formData = param;
    // }

    // this.openPage(this.viewGetSheetNo, param);
    this.row = this.rowContentSelectPurchase;
    this.stateName = '$'
    this.controllerPurchase = this.controller.cUq.cSheetFromName('采购订单');
    this.stateLabel = this.controllerPurchase.getStateLabel(this.stateName);
    this.controllerPurchase.pageStateItems = this.controllerPurchase.entity.createPageStateItems();
    await this.controllerPurchase.pageStateItems.first(this.stateName);
    this.openPage(this.viewSelectPurchase);
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

  protected get viewGetSheetNo() {
    let label = '采购收货 新开';
    return () => <Page header={label}>
      <Form className="p-3" schema={schemaPurchase} uiSchema={this.uiSchema} formData={this.formData}
        fieldLabelSize={2}
        onButtonClick={this.onFormButtonNextClick}
      />
    </Page>;
  }

  //for selectPurchase
  protected controllerPurchase: CSheet;
  protected row: (values) => JSX.Element;
  stateName: string;
  stateLabel: string;

  async openSelectPurchase(item:any) {
    this.row = this.rowContentSelectPurchase;
    this.stateName = '$';
    this.controllerPurchase = this.controller.cUq.cSheetFromName('采购订单');
    this.stateLabel = this.controllerPurchase.getStateLabel(this.stateName);
    await this.controllerPurchase.pageStateItems.first(this.stateName);
    this.openPage(this.viewSelectPurchase);
  }

  rowPurchaseClick = async (brief:any) => {
    let sheetData = await this.controllerPurchase.getSheetData(brief.id);
    let data = sheetData.data;
    this.formData.单号 = brief.no;
    this.formData['供货者'] = data.供货者.id;
    this.formData['合同单号'] = data.合同号;
    let products = [];
    if (data.products) {
      data.products.forEach((value,index)=>{
        let v1 = value;
        v1['product'] = value.product.id;
        products.push(v1);
      })
    }
    this.formData['products'] = products;
    this.openPage(this.view);
  }

  private onScrollBottomSelectPurchase = () => {
    console.log('onScrollBottom');
    this.controllerPurchase.pageStateItems.more();
  }

  protected rowContentSelectPurchase = (row:any):JSX.Element => {
    let {id, no, discription, date, processing} = row;
      let left = <>            
          {no} &nbsp; <Muted>{discription}</Muted> {processing===1? '...' : ''}
        </>;
        let right = <Muted><EasyDate date={date} /></Muted>;
        return <LMR className="px-3 py-2" left={left} right={right} />;
    }

  private renderRowSelectPurchase = (row:any, index:number) => <this.row {...row} />

  protected viewSelectPurchase = () => {
    //let sheets = this.controller.stateSheets;
    let {pageStateItems} = this.controllerPurchase;
    return <Page header={this.label + ' - ' + this.stateLabel} onScrollBottom={this.onScrollBottomSelectPurchase}>
          <>选择采购订单
          </>
            <List items={pageStateItems} item={{render:this.renderRowSelectPurchase, onClick:this.rowPurchaseClick}} />
        </Page>;
  }
}
