import * as React from 'react';
import { observer } from 'mobx-react';
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


export class CTuidSelectWarehouse extends CTuidSelect {
  protected get VTuidSelect():typeof VTuidSelect {return VTuidSelectWarehouse}

}

class VTuidSelectWarehouse extends VTuidSelect {
  onNew = async () => {
    navToEditPage('库区信息', this.controller.cUq.cApp);
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
    return <Page header="选择库区" right={rbutton} back="close">
        {header}
        <List
            items={this.controller.PageItems.items}
            item={{render: this.renderMainRow, onClick: this.clickRow}}
            before={'搜索'+this.label+'资料'} />
    </Page>;
  });

 protected divView = (param:any) => {
    let rbutton = <Button className="ml-2" color="primary" onClick={this.onNew}>新增</Button>;
    return <Page header="选择库区" right={rbutton}>
        <List
            items={param.items}
            item={{render: this.renderDivRow, onClick: this.clickDivRow}} />
    </Page>;
  }
}
