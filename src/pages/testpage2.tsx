import React from 'react';
import { nav, VPage, Page, meInFrame, Controller } from 'tonva-tools';
import {AppUI, CApp, VTuidEdit, VTuidMain, CLink} from 'tonva-react-uq';
import { FA } from 'tonva-react-form';
import {CSCMApp} from 'CSCMApp'
import { consts } from 'home/consts';
import uui from "ui";

export class TestPage2 extends VPage<CApp> {
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
            content = cUsqArr.map((v,i) => 
            <div key={i}>{v.render()}</div>);
        }
        return <Page header={'供应商信息'}
          logout={async ()=>{meInFrame.unit = undefined}}>
            <div className="p-3">-------</div>
            {content}
        </Page>;
    };
}
