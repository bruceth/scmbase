import { AppUI, CApp } from "tonva-react-uq";
import { VHome } from './main';
import { CSCMApp } from '../CSCMApp';
import scmbaseUI from './scmbase';
import $unitx from './$unitx';

const ui: AppUI = {
    appName: "bruce/SCMBase",
    CApp: CSCMApp,
    main: VHome,
    uqs: {
        '$$$/$unitx': $unitx,
        'bruce/scmbasedata': scmbaseUI
    }
}

export default ui;
