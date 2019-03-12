import React from 'react';
import { nav, VPage, Page, meInFrame, Controller } from 'tonva-tools';
import {AppUI, CApp, VTuidEdit, VTuidMain, CLink} from 'tonva-react-uq';
import { FA } from 'tonva-react-form';
import {CSCMApp} from 'CSCMApp'
import { consts } from 'home/consts';
import uui from "ui";

export class TestPage extends VPage<CApp> {
    async open(param?:any) {
        this.openPage(this.appPage);
    }

    public appPage = () => {
        let {cUqArr: cUsqArr} = this.controller;
        let content;
        if (cUsqArr.length === 0) {
            content = <div className="p-3 text-info">
                <FA name="minus-circle" className="text-danger" size="lg" /> &nbsp; 此APP没有绑定任何的USQ
            </div>;
        }
        else {
            //content = cUsqArr.map((v,i) => 
            //<div key={i}>{v.render()}</div>);

            let cuq = this.controller.getCUq(consts.uqProduct);
            let {tuidArr} = cuq.entities;
            let mid = cuq.tuid("manufactor");
            let tuidLinks = new CLink(cuq.cTuidMain(mid));
    
            content = tuidLinks.render();
        }
        return <Page header={'商品信息'}
          logout={async ()=>{meInFrame.unit = undefined}}>
            <div className="p-3">自定义程序界面。</div>
            {content}
        </Page>;
    };
}
