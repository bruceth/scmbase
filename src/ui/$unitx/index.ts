import { UqUI } from 'tonva-react-uq';
import tuid from './tuid';
import map from './map';
import query from './query';
import res from './res';
import { MyCTuid } from './cTuid';

const usqUI:UqUI = {
    CTuidMain: MyCTuid,
    tuid: tuid,
    map: map,
    query: query,
    res: res,
}

export default usqUI;