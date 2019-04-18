import * as React from 'react';
import { FA } from 'tonva-react-form';
import { observable } from 'mobx';
import { CTuidMain, VTuidMain, CTuidEdit, VTuidEdit, FieldCall, VForm, TuidMain, FieldTuidUI } from "tonva-react-uq";
import { CTuidList, VTuidMainList, CTuidSelect, VTuidSelect} from 'tonva-react-uq'
import { Page } from 'tonva-tools';
import { Form, Field, UiSchema, Schema, Context, ArrSchema, UiArr, IntSchema, StringSchema, DateSchema, UiTextAreaItem, UiIdItem, ButtonSchema, UiTextItem, NumSchema, UiCustom, nav } from 'tonva-tools';
import { SearchBox, List, Muted } from 'tonva-react-form';
import { Button } from 'reactstrap';
import { navToPage, navToEditPage } from 'pages'
import { UiItem } from 'tonva-tools/ui/form/uiSchema';
import { RowContent } from 'tonva-react-uq/controllers/form/viewModel';
import { observer } from 'mobx-react';

export class CTuidMainSupplier extends CTuidMain {
  protected get VTuidMain():typeof VTuidMain {return VTuidMainSupplier}
}

class VTuidMainSupplier extends VTuidMain {
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

export class CTuidEditSupplier extends CTuidEdit {
  protected get VTuidEdit():typeof VTuidEdit {return VTuidEditSupplier}

}

const schemaSupplier : Schema = [
  {name: 'id', type: 'id', required: false},
  {name: '名称', type: 'string', required: true, maxLength: 100} as StringSchema,
  {name: '供应商编号', type: 'string', required: true, maxLength: 100} as StringSchema,
  {name: '查询码', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '法人代表', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '注册地址', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '退货地址', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '企业性质', type: 'string', maxLength: 100} as StringSchema,
  {name: '联系人', type: 'string', maxLength: 100} as StringSchema,
  {name: 'submit', type: 'submit'}
];

const schemaSupplier2 : Schema = [
  {name: '供应商', type: 'id', required: false},
  {name: '图片', type: 'string', required: true, maxLength: 100} as StringSchema,
  {name: '企业类型', type: 'string', required: true, maxLength: 100} as StringSchema,
  {name: '许可证号', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '许可证发证日期', type: 'date', required: false } as DateSchema,
  {name: '许可证有效期至', type: 'date', required: false} as DateSchema,
  {name: '经营范围', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '范围显示', type: 'string', maxLength: 100} as StringSchema,
  {name: '营业执照号', type: 'string', maxLength: 100} as StringSchema,
  {name: '营业执照发证日期', type: 'date'} as DateSchema,
  {name: '营业执照有效期至', type: 'date'} as DateSchema,
  {name: '营业执照年检证明', type: 'string', maxLength: 100} as StringSchema,
  {name: '组织机构代码证号', type: 'string', maxLength: 100} as StringSchema,
  {name: '组织代码发证日期', type: 'date'} as DateSchema,
  {name: '组织代码有效期至', type: 'date'} as DateSchema,
  {name: '组织代码年检证明', type: 'string', maxLength: 100} as StringSchema,
  {name: '税务登记证号', type: 'string', maxLength: 100} as StringSchema,
  {name: '税务登记证发证日期', type: 'date'} as DateSchema,
  {name: 'submit', type: 'submit'}
];

const schemaSupplier3 : Schema = [
  {name: '供应商', type: 'id', required: false},
  {name: '认证', type: 'string', required: true, maxLength: 100} as StringSchema,
  {name: '证书号', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '发证日期', type: 'date'} as DateSchema,
  {name: '证书有效期启', type: 'date'} as DateSchema,
  {name: '证书有效期至', type: 'date'} as DateSchema,
  {name: '认证范围', type: 'string', maxLength: 100} as StringSchema,
  {name: 'submit', type: 'submit'}
];

class VTuidEditSupplier extends VTuidEdit {
  private form2: Form;
  private form3: Form;
  private cid: number;

  protected uiSchema : UiSchema = {
    items : {
      id: { widget: 'id', visible: false } as UiIdItem,
      名称: { widget: 'text'} as UiTextItem,
      供应商编号: { widget: 'text'} as UiTextItem,
      查询码: { widget: 'text'} as UiTextItem,
      法人代表: { widget: 'text'} as UiTextItem,
      注册地址: { widget: 'text'} as UiTextItem,
      退货地址: { widget: 'text'} as UiTextItem,
      企业性质: { widget: 'text'} as UiTextItem,
      联系人: { widget: 'text'} as UiTextItem,
      submit: {widget: 'button', className: 'btn btn-primary', Templet: <><i className="fa" />&nbsp;下一步&nbsp;</>},
    }
  }

  protected uiSchema2 : UiSchema = {
    items : {
      供应商: { widget: 'id', visible: false } as UiIdItem,
      图片: { widget: 'text'} as UiTextItem,
      企业类型: { widget: 'text'} as UiTextItem,
      许可证号: { widget: 'text'} as UiTextItem,
      许可证发证日期: { widget: 'date', label: '发证日期'} as UiItem,
      许可证有效期至: { widget: 'date', label: '有效期至'} as UiItem,
      经营范围: { widget: 'text'} as UiTextItem,
      范围显示: { widget: 'text'} as UiTextItem,
      营业执照号: { widget: 'text'} as UiTextItem,
      营业执照发证日期: { widget: 'date', label: '发证日期'} as UiItem,
      营业执照有效期至: { widget: 'date', label: '有效期至'} as UiItem,
      营业执照年检证明: { widget: 'text'} as UiTextItem,
      组织机构代码证号: { widget: 'text'} as UiTextItem,
      组织代码发证日期: { widget: 'date', label: '发证日期'} as UiItem,
      组织代码有效期至: { widget: 'date', label: '有效期至'} as UiItem,
      组织代码年检证明: { widget: 'text'} as UiTextItem,
      税务登记证号: { widget: 'text'} as UiTextItem,
      税务登记证发证日期: { widget: 'date', label: '发证日期'} as UiItem,
      submit: {widget: 'button', className: 'btn btn-primary', Templet: <><i className="fa" />&nbsp;下一步&nbsp;</>},
    }
  }

  protected uiSchema3 : UiSchema = {
    items : {
      供应商: { widget: 'id', visible: false } as UiIdItem,
      认证: { widget: 'text'} as UiTextItem,
      证书号: { widget: 'text'} as UiTextItem,
      发证日期: { widget: 'date', label: '发证日期'} as UiItem,
      证书有效期启: { widget: 'date', label: '有效期启'} as UiItem,
      证书有效期至: { widget: 'date', label: '有效期至'} as UiItem,
      认证范围: { widget: 'text'} as UiTextItem,
      submit: {widget: 'button', className: 'btn btn-primary', Templet: <><i className="fa" />&nbsp;下一步&nbsp;</>},
    }
  }

  formData = {
    id: undefined,
  }

  formData2 = {
    供应商: undefined,
  }

  formData3 = {
    供应商: undefined,
  }

  async loadMap2():Promise<any> {
    let mapc2 = this.controller.cUq.map("供应商证照信息");
    let qm2 = {供应商:this.cid};
    let qr2 = await mapc2.query(qm2);
    if (qr2 !== undefined) {
      let {ret} = qr2 as {ret:any[]};
      if (ret && ret.length > 0){
        let fd = ret[0];
        fd.供应商 = this.cid;
        this.formData2 = fd;
      }
    }
  }

  async loadMap3():Promise<any> {
    let mapc3 = this.controller.cUq.map("供应商认证信息");
    let qm3 = {供应商:this.cid};
    let qr3 = await mapc3.query(qm3);
    if (qr3 !== undefined) {
      let {ret} = qr3 as {ret:any[]};
      if (ret && ret.length > 0){
        let fd = ret[0];
        fd.供应商 = this.cid;
        this.formData3 = fd;
      }
    }
  }

  async open(param?:any):Promise<void> {
    if (param !== undefined) {
      this.formData = param;

      this.cid = this.formData.id;
      this.formData2.供应商 = this.cid;
      this.formData3.供应商 = this.cid;
      let promises:PromiseLike<any>[] = [];
      promises.push(this.loadMap2());
      promises.push(this.loadMap3());
      await Promise.all(promises);
    }
    this.openPage(this.view, param);
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
      let mapc2 = this.controller.cUq.map("供应商证照信息");
      let mapc3 = this.controller.cUq.map("供应商认证信息");
      let ret = await this.controller.entity.save(this.cid, this.formData);
      let {id} = ret;
      if (id < 0) {
        return;
      }
      this.formData2.供应商 = id;
      this.formData3.供应商 = id;
      let promises:PromiseLike<any>[] = [];
      promises.push(mapc2.add(this.formData2));
      promises.push(mapc3.add(this.formData3));
      await Promise.all(promises);
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
  
    this.formData2 = { 供应商: undefined }
  
    this.formData3 = { 供应商: undefined }
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
      <Form className="p-3" schema={schemaSupplier} uiSchema={this.uiSchema} formData={this.formData}
        fieldLabelSize={2}
        onButtonClick={this.onFormButtonNextClick}
      />
    </Page>;
  }

  protected get view2() {
    let {label} = this.controller;
    return () => <Page header={label}>
      <Form ref={v => this.form2 = v} className="p-3" schema={schemaSupplier2} uiSchema={this.uiSchema2} formData={this.formData2}
        fieldLabelSize={2}
        onButtonClick={this.onFormButtonNextClick2}
      />
    </Page>;
  }

  protected get view3() {
    let {label} = this.controller;
    return () => <Page header={label}>
      <Form ref={v => this.form3 = v} className="p-3" schema={schemaSupplier3} uiSchema={this.uiSchema3} formData={this.formData3}
        fieldLabelSize={2}
        onButtonClick={this.onFormButtonNextClick3}
      />
    </Page>;
  }
}

export class CTuidSelectSupplier extends CTuidSelect {
  protected get VTuidSelect():typeof VTuidSelect {return VTuidSelectSupplier}

}

class VTuidSelectSupplier extends VTuidSelect {
  onNew = async () => {
    navToEditPage('供应商信息', this.controller.cUq.cApp);
  }

  async open(param?:any): Promise<void> {
    await this.showM(param);
  }

  protected async showM(param?:any) {
    this.mainRowContent = this.ui.rowContent || RowContent;
    await this.controller.searchMain('');
    this.openPage(this.mainView);
  }

  clickRow = (item:any) => {
    this.backPage();
    this.returnCall(item);
  }

  protected mainView = observer(() => {
    let rbutton = <Button className="ml-2" color="primary" onClick={this.onNew}>新增</Button>;
    let header = <SearchBox className="mx-1 w-100"
      initKey={''}
      onSearch={this.onSearchMain} placeholder={'搜索'+this.label} />;
    return <Page header="选择供应商" right={rbutton} back="close">
      {header}
      <List
        items={this.controller.PageItems.items}
        item={{render: this.renderMainRow, onClick: this.clickRow}}
        before={'搜索'+this.label+'资料'} />
      </Page>;
  });

  protected divView = (param:any) => {
    let rbutton = <Button className="ml-2" color="primary" onClick={this.onNew}>新增</Button>;
    return <Page header="选择供应商" right={rbutton}>
        <List
            items={param.items}
            item={{render: this.renderDivRow, onClick: this.clickDivRow}} />
    </Page>;
  }
}

export class CTuidListSupplier extends CTuidList {
  protected get VTuidList():typeof VTuidMainList {return VTuidMainListSupplier}

}

export class VTuidMainListSupplier extends VTuidMainList {

}
