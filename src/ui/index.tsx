import { AppUI, CApp } from "tonva-react-uq";
import { VHome } from './main';
import { CSCMApp } from '../CSCMApp';
import scmbaseUI from './scmbase';

const ui: AppUI = {
    appName: "bruce/SCMBase",
    CApp: CSCMApp,
    main: VHome,
    uqs: {
        'bruce/scmbasedata': scmbaseUI
    }
}

export default ui;
