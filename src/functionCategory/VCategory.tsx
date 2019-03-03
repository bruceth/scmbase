import * as React from 'react';
import { CFunctionCategory } from './CFunctionCategory';
import { VPage, Page } from 'tonva-tools';
import { List, FA } from 'tonva-react-form';
import { tv } from 'tonva-react-uq';
import { titleTitle, subStyle } from './VRootCategory';

export class VCategory extends VPage<CFunctionCategory> {

  async open(categoryWaper: any) {
    this.openPage(this.page, categoryWaper);
  }

  private renderChild = (childWapper: any) => {
    return <div className="py-2"><FA name="hand-o-right mr-2"></FA>{childWapper.name}</div>
  }

  private categoryClick = async (childWapper: any, parent: any) => {
    await this.controller.openMainPage(childWapper, parent);
  }

  private renderRootCategory = (item: any, parent: any) => {
    let { name, children } = item;
    return <div className="bg-white mb-3" key={name}>
      <div className="py-2 px-3">
        <b>{name}</b>
      </div>
      <div className=""
        style={{ paddingRight: '1px' }}
      >
        <div className="row no-gutters">
          {children.map(v => this.renderSubCategory(v, item))}
        </div>
      </div>
    </div>
  }

  private renderSubCategory = (item: any, parent: any) => {
    let { name, children } = item;
    return <div key={name}
      className="col-6 col-md-4 col-lg-3 cursor-pointer"
      //style={{borderRight:'1px solid gray', borderBottom:'1px solid gray'}}
      onClick={() => this.categoryClick(item, parent)}>
      <div className="pt-1 pb-1 px-2"
        style={{ border: '1px solid #eeeeee', marginRight: '-1px', marginBottom: '-1px' }}
      >
        <div style={titleTitle}>
          <span className="ml-1 align-middle">
            <FA name="chevron-right" className="text-info small" />
            &nbsp; {name}
          </span>
        </div>
      </div>
    </div>;
    // <img src={consts.appIcon} alt="structure" style={imgStyle} />
  }

  private page = (categoryWaper: any) => {

    let { cHome } = this.controller.cApp;
    let header = cHome.renderSearchHeader();

    let { categoryWaper: item, parent } = categoryWaper;
    return <Page header={header} >
      {this.renderRootCategory(item, parent)}
    </Page>
  }
}