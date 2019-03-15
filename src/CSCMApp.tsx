import * as React from 'react';

import { CApp, CUq } from 'tonva-react-uq';
import { CHome } from './home/CHome';
import { CFunctionCategory } from 'functionCategory/CFunctionCategory';
import { consts } from './home/consts';
import { WebUser } from 'CurrentUser';
import { Controller, VPage } from 'tonva-tools'

export class CSCMApp extends CApp {

    currentUser: WebUser;
    cUqProcut : CUq;
    currentSalesRegion: any;
    currentLanguage: any;

    cHome: CHome;
    cFunctionCategory: CFunctionCategory;

    protected async internalStart() {
        this.cUqProcut = this.getCUq(consts.uqBasedata);
        if (this.isLogined) {
            //this.currentUser.user = this.user;
        }

        let ccc = this.cUqProcut.tuid('product');
        let ccm = this.cUqProcut.tuid('manufactor');

        this.cFunctionCategory = new CFunctionCategory(this, undefined);
        this.cHome = new CHome(this, undefined);

        let promises: PromiseLike<void>[] = [];
        promises.push(this.cFunctionCategory.start());
        await Promise.all(promises);
        this.showMain();
    }

    showMain(initTabName?: string){
        this.openVPage(this.VAppMain, initTabName);
    }

    public async showOneVPage(vp: new (coordinator: Controller)=>VPage<Controller>, param?:any):Promise<void> {
        await (new vp(this)).open(param);
    }

    protected onDispose() {
    }
}
