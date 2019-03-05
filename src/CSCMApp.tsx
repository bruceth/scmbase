import * as React from 'react';

import { CApp, CUq } from 'tonva-react-uq';
import { CHome } from './home/CHome';
import { CFunctionCategory } from 'functionCategory/CFunctionCategory';
import { consts } from './home/consts';
import { WebUser } from 'CurrentUser';

export class CSCMApp extends CApp {

    currentUser: WebUser;

    currentSalesRegion: any;
    currentLanguage: any;

    cHome: CHome;
    cFunctionCategory: CFunctionCategory;

    protected async internalStart() {

        if (this.isLogined) {
            //this.currentUser.user = this.user;
        }

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

    protected onDispose() {
    }
}
