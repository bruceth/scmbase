import * as React from 'react';
import { FA } from 'tonva-react-form';
import { CTuidMain, VTuidMain, CTuidEdit, VEntity, Tuid, TuidUI, VTuidEdit, FieldCall, VForm, TuidMain, FieldTuidUI } from "tonva-react-uq";
import { CTuidList, VTuidMainList, CTuidSelect, VTuidSelect} from 'tonva-react-uq'
import { Page, UiInputItem } from 'tonva-tools';
import { Form, Field, UiSchema, Schema, Context, ArrSchema, UiArr, IntSchema, IdSchema, StringSchema, DateSchema, UiTextAreaItem, UiIdItem, UiRange, ButtonSchema, UiTextItem, NumSchema, UiCustom, nav } from 'tonva-tools';
import { SearchBox, List, Muted } from 'tonva-react-form';
import { Button } from 'reactstrap';
import { navToPage, navToEditPage } from 'pages'
import { UiItem } from 'tonva-tools/ui/form/uiSchema';
import { RowContent } from 'tonva-react-uq/controllers/form/viewModel';
import { observer } from 'mobx-react';

export class CTuidMainProduct extends CTuidMain {
  protected get VTuidMain():typeof VTuidMain {return VTuidMainProduct}
}

class VTuidMainProduct extends VTuidMain {
  onPackType = async () => {
    navToPage('packtype', this.controller.cUq.cApp);
  }
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

export class CTuidEditProduct extends CTuidEdit {
  protected get VTuidEditC():typeof VTuidEditProduct {return VTuidEditProduct}

  protected async edit(values:any) {
    await this.openVPage(this.VTuidEditC, values);
  }

  pickManufactor = async (context: Context, name: string, value: number): Promise<number> => {
    //let cAddress = new CAddress(this.cApp, undefined);
    //return await cAddress.call<number>();
    let uq = this.cUq.cTuidSelectFromName('生产厂商');
    let r= await uq.call();
    return r.id;
  }
}

const schemaProduct : Schema = [
  {name: 'id', type: 'id', required: false},
  {name: '名称', type: 'string', required: true, maxLength: 100} as StringSchema,
  {name: '编码', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '查询码', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '通用名称', type: 'string', maxLength: 100} as StringSchema,
  {name: '生产厂商', type: 'id', required: false, maxLength: 100} as IdSchema,
  {name: '商品分类', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '生产日期', type: 'date', required: false } as DateSchema,
  {name: '有效期', type: 'date', required: false} as DateSchema,
  {name: 'submit', type: 'submit'}
];

const schemaProduct2 : Schema = [
  {name: 'product', type: 'id', required: false},
  {name: '图片', type: 'string', required: true, maxLength: 200} as StringSchema,
  {name: '商品条形码', type: 'string', required: true, maxLength: 100} as StringSchema,
  {name: '规格型号', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '单位', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '计量单位类型', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '中包装', type: 'string', maxLength: 100} as StringSchema,
  {name: '默认包装', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '件长', type: 'string', maxLength: 100} as StringSchema,
  {name: '件宽', type: 'string', required: false, maxLength: 100} as StringSchema,
  {name: '件高', type: 'string', maxLength: 100} as StringSchema,
  {name: '堆码层数极限', type: 'integer'} as IntSchema,
  {name: '小包装长', type: 'string', maxLength: 100} as StringSchema,
  {name: '小包装宽', type: 'string', maxLength: 100} as StringSchema,
  {name: '小包装高', type: 'string', maxLength: 100} as StringSchema,
  {name: '上架拆中包装', type: 'string', maxLength: 100} as StringSchema,
  {name: '单位体积', type: 'string', maxLength: 100} as StringSchema,
  {name: 'submit', type: 'submit'}
];

const schemaProduct3 : Schema = [
  {name: 'product', type: 'id', required: false},
  {name: '零售价', type: 'number', required: true} as NumSchema,
  {name: '批发价', type: 'number', required: false} as NumSchema,
  {name: '税率', type: 'number', required: false} as NumSchema,
  {name: '销项税率', type: 'number', required: false} as NumSchema,
  {name: '折扣分类', type: 'number', required: false} as NumSchema,
  {name: '折扣率', type: 'number', required: false} as NumSchema,
  {name: 'submit', type: 'submit'}
];

class VTuidEditProduct extends VEntity<Tuid, TuidUI, CTuidEditProduct> {
  private form2: Form;
  private form3: Form;
  private cid: number;

  protected uiSchema : UiSchema = {
    items : {
      id: { widget: 'id', visible: false } as UiIdItem,
      名称: { widget: 'text', label: '名称'} as UiTextItem,
      编码: { widget: 'text'} as UiTextItem, 
      查询码: { widget: 'text'} as UiTextItem,
      通用名称: { widget: 'text'} as UiTextItem,
      生产厂商: { 
        widget: 'id',
        pickId: async (context: Context, name: string, value: number) => {
          return await this.controller.pickManufactor(context, name, value);
        }
      } as UiIdItem,
      商品分类: { widget: 'text'} as UiTextItem,
      生产日期: { widget: 'date'} as UiItem,
      有效期: { widget: 'date'} as UiItem,
      submit: {widget: 'button', className: 'btn btn-primary', Templet: <><i className="fa" />&nbsp;下一步&nbsp;</>},
    }
  }

  protected uiSchema2 : UiSchema = {
    items : {
      product: { widget: 'id', visible: false } as UiIdItem,
      商品条形码: { widget: 'text'} as UiTextItem,
      规格型号: { widget: 'text'} as UiTextItem,
      单位: { widget: 'text'} as UiTextItem,
      计量单位类型: { widget: 'text'} as UiTextItem,
      中包装: { widget: 'text'} as UiTextItem,
      默认包装: { widget: 'text'} as UiTextItem,
      件长: { widget: 'text'} as UiTextItem,
      件宽: { widget: 'text'} as UiTextItem,
      件高: { widget: 'text'} as UiTextItem,
      堆码层数极限: { widget: 'updown', min: 1, max: 100, step: 1 } as UiInputItem,
      小包装长: { widget: 'text'} as UiTextItem,
      小包装宽: { widget: 'text'} as UiTextItem,
      小包装高: { widget: 'text'} as UiTextItem,
      上架拆中包装: { widget: 'text'} as UiTextItem,
      单位体积: { widget: 'text'} as UiTextItem,
      submit: {widget: 'button', className: 'btn btn-primary', Templet: <><i className="fa" />&nbsp;下一步&nbsp;</>},
    }
  }

  protected uiSchema3 : UiSchema = {
    items : {
      product: { widget: 'id', visible: false } as UiIdItem,
      零售价: { widget: 'text'} as UiTextItem,
      批发价: { widget: 'text'} as UiTextItem,
      税率: { widget: 'text'} as UiTextItem,
      销项税率: { widget: 'text'} as UiTextItem,
      折扣分类: { widget: 'text'} as UiTextItem,
      折扣率: { widget: 'text'} as UiTextItem,
      submit: {widget: 'button', className: 'btn btn-primary', Templet: <><i className="fa" />&nbsp;下一步&nbsp;</>},
    }
  }

  formData = {
    id: undefined,
  }

  formData2 = {
    product: undefined,
  }

  formData3 = {
    product: undefined,
  }

  async loadMap2():Promise<any> {
    let mapc2 = this.controller.cUq.map("ProductInfo");
    let qm2 = {product:this.cid};
    let qr2 = await mapc2.query(qm2);
    if (qr2 !== undefined) {
      let {ret} = qr2 as {ret:any[]};
      if (ret && ret.length > 0){
        let fd = ret[0];
        fd.product = this.cid;
        this.formData2 = fd;
      }
    }
  }

  async loadMap3():Promise<any> {
    let mapc3 = this.controller.cUq.map("ProductPrice");
    let qm3 = {product:this.cid};
    let qr3 = await mapc3.query(qm3);
    if (qr3 !== undefined) {
      let {ret} = qr3 as {ret:any[]};
      if (ret && ret.length > 0){
        let fd = ret[0];
        fd.客户 = this.cid;
        this.formData3 = fd;
      }
    }
  }

  async open(param?:any):Promise<void> {
    if (param !== undefined) {
      let dataF = param;
      dataF.生产厂商 = param.生产厂商.id;
      this.formData = dataF;

      this.cid = this.formData.id;
      this.formData2.product = this.cid;
      this.formData3.product = this.cid;
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
      let mapc2 = this.controller.cUq.map("ProductInfo");
      let mapc3 = this.controller.cUq.map("ProductPrice");
      let ret = await this.controller.entity.save(this.cid, this.formData);
      let {id, inId} = ret;
      if (inId < 0  && id < 0) {
        return;
      }
      if (inId > 0)
        id = inId;
      this.formData2.product = id;
      this.formData3.product = id;
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
  
    this.formData2 = { product: undefined }
  
    this.formData3 = { product: undefined }
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
      <Form className="p-3" schema={schemaProduct} uiSchema={this.uiSchema} formData={this.formData}
        fieldLabelSize={2}
        onButtonClick={this.onFormButtonNextClick}
      />
    </Page>;
  }

  protected get view2() {
    let {label} = this.controller;
    return () => <Page header={label}>
      <Form ref={v => this.form2 = v} className="p-3" schema={schemaProduct2} uiSchema={this.uiSchema2} formData={this.formData2}
        fieldLabelSize={2}
        onButtonClick={this.onFormButtonNextClick2}
      />
    </Page>;
  }

  protected get view3() {
    let {label} = this.controller;
    return () => <Page header={label}>
      <Form ref={v => this.form3 = v} className="p-3" schema={schemaProduct3} uiSchema={this.uiSchema3} formData={this.formData3}
        fieldLabelSize={2}
        onButtonClick={this.onFormButtonNextClick3}
      />
    </Page>;
  }
}

export class CTuidSelectProduct extends CTuidSelect {
  protected get VTuidSelect():typeof VTuidSelect {return VTuidSelectProduct}

}

class VTuidSelectProduct extends VTuidSelect {
  onNew = async () => {
    navToEditPage('商品信息', this.controller.cUq.cApp);
  }

  async open(param?:any): Promise<void> {
    await this.showM(param);
  }

  protected async showM(param) {
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
    return <Page header="选择商品" right={rbutton} back="close">
      {header}
      <List
        items={this.controller.PageItems.items}
        item={{render: this.renderMainRow, onClick: this.clickRow}}
        before={'搜索'+this.label+'资料'} />
      </Page>;
  });

  protected divView = (param:any) => {
    let rbutton = <Button className="ml-2" color="primary" onClick={this.onNew}>新增</Button>;
    return <Page header="选择商品" right={rbutton}>
        <List
            items={param.items}
            item={{render: this.renderDivRow, onClick: this.clickDivRow}} />
    </Page>;
  }
}

export class CTuidListProduct extends CTuidList {
  protected get VTuidList():typeof VTuidMainList {return VTuidMainListProduct}

}

export class VTuidMainListProduct extends VTuidMainList {

}
