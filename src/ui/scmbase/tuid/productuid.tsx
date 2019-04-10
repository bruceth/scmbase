import * as React from 'react';
import { CTuidMain, VTuidMain, Field, FieldCall, VForm, TuidMain, FieldTuidUI } from "tonva-react-uq";
import { Page } from 'tonva-tools';
import { SearchBox, List, Muted } from 'tonva-react-form';
import { Button } from 'reactstrap';
import { navToPage } from 'pages'

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