import * as React from 'react';
import { TuidMain } from 'tonva-react-uq';
import { VSiteHeader } from './VSiteHeader';
import { CSCMApp } from '../CSCMApp';
import { PageItems, Controller } from 'tonva-tools';
import { VSearchHeader } from './VSearchHeader';
import { VHome } from './VHome';

class HomeSections extends PageItems<any> {

    private sectionTuid: TuidMain;

    constructor(sectionTuid: TuidMain) {
        super();
        this.firstSize = this.pageSize = 13;
        this.sectionTuid = sectionTuid;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.sectionTuid.search("", pageStart, pageSize);
        return ret;
    }

    protected setPageStart(item: any): any {
        if (item === undefined) return 0;
        return item.id;
    }
}

export class CHome extends Controller {

    cApp: CSCMApp;
    homeSections: HomeSections;
    sectionTuid: TuidMain;

    constructor(cApp: CSCMApp, res: any) {
        super(res);

        this.cApp = cApp;
    }

    async internalStart(param: any) {

        let { cFunctionCategory } = this.cApp;
        await cFunctionCategory.start();
        this.openVPage(VHome);
    }

    renderSiteHeader = () => {
        return this.renderView(VSiteHeader);
    }

    renderSearchHeader = (size?:string) => {
        return this.renderView(VSearchHeader, size);
    }

    renderCategoryRootList = () => {
        let { cFunctionCategory } = this.cApp;
        return cFunctionCategory.renderRootList();
    }

    renderHome = () => {
        return this.renderView(VHome);
    }

    openMetaView = () => {
        this.cApp.startDebug();
    }

    tab = () => <this.renderHome />;
}