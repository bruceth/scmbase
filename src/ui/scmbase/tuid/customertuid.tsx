import * as React from 'react';
import { FA } from 'tonva-react-form';
import { observable } from 'mobx';
import { CTuidMain, VTuidMain, CTuidSelect, VTuidSelect, CTuidEdit, VTuidEdit, FieldCall, VForm, TuidMain, FieldTuidUI } from "tonva-react-uq";
import { Page } from 'tonva-tools';
import { Form, Field, UiSchema, Schema, Context, ArrSchema, UiArr, IntSchema, StringSchema, DateSchema, UiTextAreaItem, UiIdItem, ButtonSchema, UiTextItem, NumSchema, UiCustom, nav } from 'tonva-tools';
import { SearchBox, List, Muted } from 'tonva-react-form';
import { Button } from 'reactstrap';
import { navToPage, navToEditPage } from 'pages'
import { UiItem } from 'tonva-tools/ui/form/uiSchema';

export class CTuidMainCustomer extends CTuidMain {
  protected get VTuidMain():typeof VTuidMain {return VTuidMainCustomer}
}

class VTuidMainCustomer extends VTuidMain {
  protected get view() {
      let {label, proxyLinks} = this.controller;
      return () => <Page header={label}>
          {proxyLinks === undefined ?
          <>
              <SearchBox className="w-100" onSearch={this.onSearch} placeholder={'搜索'+label} />
              <div className='my-3'>
                  <Button className="ml-3" color="primary" onClick={this.onNew}>新增</Button>
                  <Button className="ml-3" color="primary" onClick={this.onList}>列表</Button>
              </div>
          </> :
          <List className="my-2"
              header={<Muted>{label} 代理下列Tuid</Muted>}
              items={proxyLinks}
              item={{render: this.entityRender, onClick:this.entityClick}} />
          }
      </Page>;
  }
}

export class CTuidEditCustomer extends CTuidEdit {
  protected get VTuidEdit():typeof VTuidEdit {return VTuidEditCustomer}

}

const schemaCustomer : Schema = [
  {name: 'id', type: 'id', required: false},
  {name: '名称', type: 'string', required: true, maxLength: 100} as StringSchema,
  {name: '客户编号', type: 'string', required: true, maxLength: 100} as StringSchema,
  {name: '查询码', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '法人代表', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '收货地址', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '调拨类型', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '运输方式', type: 'string', maxLength: 100} as StringSchema,
  {name: '联系人', type: 'string', maxLength: 100} as StringSchema,
  {name: 'submit', type: 'submit'}
];

const schemaCustomer2 : Schema = [
  {name: '客户', type: 'id', required: false},
  {name: '图片', type: 'string', required: true, maxLength: 100} as StringSchema,
  {name: '企业类型', type: 'string', required: true, maxLength: 100} as StringSchema,
  {name: '许可证号', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '发证日期', type: 'date', required: false } as DateSchema,
  {name: '有效期至', type: 'date', required: false} as DateSchema,
  {name: '经营范围', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '范围显示', type: 'string', maxLength: 100} as StringSchema,
  {name: '营业执照', type: 'string', maxLength: 100} as StringSchema,
  {name: '营业执照发证日期', type: 'date'} as DateSchema,
  {name: '营业执照有效期至', type: 'date'} as DateSchema,
  {name: '营业执照年检证明', type: 'string', maxLength: 100} as StringSchema,
  {name: '组织机构代码证号', type: 'string', maxLength: 100} as StringSchema,
  {name: '代码证发证日期', type: 'date'} as DateSchema,
  {name: '代码证有效期至', type: 'date'} as DateSchema,
  {name: '代码证年检证明', type: 'string', maxLength: 100} as StringSchema,
  {name: 'GMP', type: 'string', maxLength: 100} as StringSchema,
  {name: 'GMP发证日期', type: 'date'} as DateSchema,
  {name: 'submit', type: 'submit'}
];

const schemaCustomer3 : Schema = [
  {name: '客户', type: 'id', required: false},
  {name: '税号', type: 'string', required: true, maxLength: 100} as StringSchema,
  {name: '开户行', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '账号', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '记账方式', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '换票方式', type: 'string', maxLength: 100} as StringSchema,
  {name: '换票类型', type: 'string', maxLength: 100} as StringSchema,
  {name: 'submit', type: 'submit'}
];

class VTuidEditCustomer extends VTuidEdit {
  private form2: Form;
  private form3: Form;
  private cid: number;

  protected uiSchema : UiSchema = {
    items : {
      id: { widget: 'id', visible: false } as UiIdItem,
      名称: { widget: 'text'} as UiTextItem,
      客户编号: { widget: 'text'} as UiTextItem,
      查询码: { widget: 'text'} as UiTextItem,
      法人代表: { widget: 'text'} as UiTextItem,
      收货地址: { widget: 'text'} as UiTextItem,
      调拨类型: { widget: 'text'} as UiTextItem,
      运输方式: { widget: 'text'} as UiTextItem,
      联系人: { widget: 'text'} as UiTextItem,
      submit: {widget: 'button', className: 'btn btn-primary', Templet: <><i className="fa" />&nbsp;下一步&nbsp;</>},
    }
  }

  protected uiSchema2 : UiSchema = {
    items : {
      客户: { widget: 'id', visible: false } as UiIdItem,
      图片: { widget: 'text'} as UiTextItem,
      企业类型: { widget: 'text'} as UiTextItem,
      许可证号: { widget: 'text'} as UiTextItem,
      发证日期: { widget: 'date'} as UiItem,
      有效期至: { widget: 'date'} as UiItem,
      经营范围: { widget: 'text'} as UiTextItem,
      范围显示: { widget: 'text'} as UiTextItem,
      营业执照: { widget: 'text'} as UiTextItem,
      营业执照发证日期: { widget: 'date', label: '发证日期'} as UiItem,
      营业执照有效期至: { widget: 'date', label: '有效期至'} as UiItem,
      营业执照年检证明: { widget: 'text'} as UiTextItem,
      组织机构代码证号: { widget: 'text'} as UiTextItem,
      代码证发证日期: { widget: 'date', label: '发证日期'} as UiItem,
      代码证有效期至: { widget: 'date', label: '有效期至'} as UiItem,
      代码证年检证明: { widget: 'text'} as UiTextItem,
      GMP: { widget: 'text'} as UiTextItem,
      GMP发证日期: { widget: 'date', label: '发证日期'} as UiItem,
      prev: {widget: 'button', className: 'btn', Templet: <><i className="fa" />&nbsp;上一步&nbsp;</>},
      submit: {widget: 'button', className: 'btn btn-primary', Templet: <><i className="fa" />&nbsp;下一步&nbsp;</>},
    }
  }

  protected uiSchema3 : UiSchema = {
    items : {
      客户: { widget: 'id', visible: false } as UiIdItem,
      税号: { widget: 'text'} as UiTextItem,
      开户行: { widget: 'text'} as UiTextItem,
      账号: { widget: 'text'} as UiTextItem,
      记账方式: { widget: 'text'} as UiTextItem,
      换票方式: { widget: 'text'} as UiTextItem,
      换票类型: { widget: 'text'} as UiTextItem,
      prev: {widget: 'button', className: 'btn', Templet: <><i className="fa" />&nbsp;上一步&nbsp;</>},
      submit: {widget: 'button', className: 'btn btn-primary', Templet: <><i className="fa" />&nbsp;下一步&nbsp;</>},
    }
  }

  @observable formData = {
    id: undefined,
  }

  formData2 = {
    客户: undefined,
  }

  formData3 = {
    客户: undefined,
  }

  async open(param?:any):Promise<void> {
    this.openPage(this.view);
  }

  onFormButtonNextClick = async (name:string, context:Context) => {
    if (name === 'submit') {
      this.formData = context.data;
      this.openPage(this.view2);
      this.controller.regConfirmClose(async () => {
        this.formData2 = this.form2.data;
        return true;
      })    
    }
  }

  onFormButtonNextClick2 = async (name:string, context:Context) => {
    if (name === 'submit') {
      this.formData2 = context.data;
      this.openPage(this.view3);    
      this.controller.regConfirmClose(async () => {
        this.formData3 = this.form3.data;
        return true;
      })    
    }
  }

  onFormButtonNextClick3 = async (name:string, context:Context) => {
    if (name === 'submit') {
      this.formData3 = context.data;
      this.cid = this.formData.id;
      let mapc2 = this.controller.cUq.map("客户证照信息");
      let mapc3 = this.controller.cUq.map("客户财务信息");
      let ret = await this.controller.entity.save(this.cid, this.formData);
      let {id} = ret;
      if (id < 0) {
        return;
      }
      this.formData2.客户 = id;
      this.formData3.客户 = id;
      let promises:PromiseLike<any>[] = [];
      promises.push(mapc2.add(this.formData2));
      promises.push(mapc3.add(this.formData3));
      await Promise.all(promises);
      //this.closePage(3);
      this.openPageElement(<Page header={this.label + '提交成功'} back="none">
            <div className='m-3'>
                <span className="text-success">
                    <FA name='check-circle' size='lg' /> 成功提交！
                </span>
                <div className='mt-5'>
                    <button className="btn btn-primary mr-3" onClick={this.next}>继续录入</button>
                    <button className="btn btn-outline-primary" onClick={this.finish}>不继续</button>
                </div>
            </div>
        </Page>);
    }
  }

  reset() {
    this.formData = { id: undefined }
  
    this.formData2 = { 客户: undefined }
  
    this.formData3 = { 客户: undefined }
  }

  protected next = async () => {
    this.reset();
    this.closePage(4);
    await this.open();
  }

  protected finish = () => {
    this.closePage(4);
  }

  protected get view() {
    let {label} = this.controller;
    return () => <Page header={label}>
      <Form className="p-3" schema={schemaCustomer} uiSchema={this.uiSchema} formData={this.formData}
        fieldLabelSize={2}
        onButtonClick={this.onFormButtonNextClick}
      />
    </Page>;
  }

  protected get view2() {
    let {label} = this.controller;
    return () => <Page header={label}>
      <Form ref={v => this.form2 = v} className="p-3" schema={schemaCustomer2} uiSchema={this.uiSchema2} formData={this.formData2}
        fieldLabelSize={2}
        onButtonClick={this.onFormButtonNextClick2}
      />
    </Page>;
  }

  protected get view3() {
    let {label} = this.controller;
    return () => <Page header={label}>
      <Form ref={v => this.form3 = v} className="p-3" schema={schemaCustomer3} uiSchema={this.uiSchema3} formData={this.formData3}
        fieldLabelSize={2}
        onButtonClick={this.onFormButtonNextClick3}
      />
    </Page>;
  }
}

export class CTuidSelectCustomer extends CTuidSelect {
  protected get VTuidSelect():typeof VTuidSelect {return VTuidSelectCustomer}

}

class VTuidSelectCustomer extends VTuidSelect {
  onNew = async () => {
    navToEditPage('客户信息', this.controller.cUq.cApp);
  }
  protected divView = (param:any) => {
    let rbutton = <Button className="ml-2" color="primary" onClick={this.onNew}>新增</Button>;
    return <Page header="选择客户" right={rbutton}>
        <List
            items={param.items}
            item={{render: this.renderDivRow, onClick: this.clickDivRow}} />
    </Page>;
  }
}