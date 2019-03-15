import { AppUI, CApp } from "tonva-react-uq";
import { VHome } from './main';
import { CSCMApp } from '../CSCMApp';
import orderUI from './order';
import productUI from './product';
import customerUI from './customer';
import warehouseUI from './warehouse';
import $unitx from './$unitx';

const ui: AppUI = {
    appName: "bruce/SCMBase",
    CApp: CSCMApp,
    main: VHome,
    uqs: {
        '$$$/$unitx': $unitx,
        'bruce/scmbasedata': productUI
    }
}

export default ui;
