import { UqUI } from 'tonva-react-uq';
import tuid from './tuid';
import res from './res';
import sheet from './sheet';
//import map from './map';

const uqUI:UqUI = {
    //CTuidMain: MyCTuid,
    tuid: tuid,
    sheet: sheet,
    res: res
}


const uqUIs = uqUI;
/*
{
    $: uqUI,
    "aa-bb": aa_BB_UsqUI,
}
*/
export default uqUIs;
