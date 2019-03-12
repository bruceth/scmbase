import * as React from 'react';
import { Muted } from 'tonva-react-form';
import { left0 } from 'tonva-tools';
//import { dictionary as x } from '../../res';
import { VMapMain, MapUI, Field, CMap }  from 'tonva-react-uq'; 

class CMapTeamPerson extends CMap {
    async searchOnKey(keyField:Field, param):Promise<number> {
        switch (keyField.name) {
            default: return await super.searchOnKey(keyField, param);
            case 'post': return await this.searchOnPost(param);                
        }
    }

    private async searchOnPost(param: any):Promise<number> {
        let querySelect = this.cQuerySelect('teamPosts');
        let val = await querySelect.call(param);
        return val['post'].id;
    }
}

class VMapTeamPerson extends VMapMain {
}

const ui:MapUI = {
    CMap: CMapTeamPerson,
    //label: '部门员工对照表',
    //main: VMapTeamPerson,
    keys: [
        {
            content: ({name, id}:any, x) => <><Muted>{x.team}</Muted> {name}</>,
            none: (x)=>x.noStaff,
        },
        {
            content: ({name, id}:any, x) => <><Muted>{x.staff}</Muted> {name} &nbsp; <Muted>{x.no} {left0(id, 4)}</Muted></>,
            none: (x)=>x.noPost,
        },
        {
            content: ({x, title, id}:any) => <><Muted>{x.post}</Muted> {title}</>,
            none: undefined,
        },
    ]
}

export default ui;
