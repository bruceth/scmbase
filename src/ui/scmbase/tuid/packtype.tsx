import * as React from 'react';
import { CTuidMain, VTuidMain, CTuidSelect, VTuidSelect, Field, FieldCall, VForm, TuidMain, FieldTuidUI } from "tonva-react-uq";
import { Page } from 'tonva-tools';
import { SearchBox, List, Muted } from 'tonva-react-form';
import { Button } from 'reactstrap';
import { navToPage, navToEditPage } from 'pages'

export class CTuidMainPackType extends CTuidMain {
  protected get VTuidMain():typeof VTuidMain {return VTuidMainPackType}
}

class VTuidMainPackType extends VTuidMain {
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

export class CTuidSelectPackType extends CTuidSelect {
  protected get VTuidSelect():typeof VTuidSelect {return VTuidSelectPackType}
}

class VTuidSelectPackType extends VTuidSelect {
  onNew = async () => {
    navToEditPage('packtype', this.controller.cUq.cApp);
  }
  protected divView = (param:any) => {
    let rbutton = <Button className="ml-2" color="primary" onClick={this.onNew}>新增</Button>;
    return <Page header="选择计量单位" right={rbutton}>
        <List
            items={param.items}
            item={{render: this.renderDivRow, onClick: this.clickDivRow}} />
    </Page>;
  }
}