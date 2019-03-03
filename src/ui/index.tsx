import { AppUI, CApp } from "tonva-react-uq";
import { VHome } from './main';
import { CSCMApp } from '../CSCMApp';
import orderUI from './order';
import productUI from './product';
import customerUI from './customer';
import warehouseUI from './warehouse';

const ui: AppUI = {
    CApp: CSCMApp,
    main: VHome,
    uqs: {
        'SCM/order': orderUI,
        'SCM/product': productUI,
        'SCM/customer': customerUI,
        'SCM/warehouse': warehouseUI,
    }
}

export default ui;
