import * as React from 'react';
import { observer } from 'mobx-react';
import { LMR, Muted } from 'tonva-react-form';
import { tv, TuidUI, FieldTuidUI } from 'tonva-react-uq';
import { CTuidMainProduct, CTuidEditProduct, CTuidSelectProduct, CTuidListProduct } from './productuid'
import { CTuidMainPackType, CTuidSelectPackType} from './packtype'
import { CTuidMainCustomer, CTuidSelectCustomer, CTuidEditCustomer, CTuidListCustomer } from './customertuid'
import { CTuidMainSupplier, CTuidSelectSupplier, CTuidEditSupplier, CTuidListSupplier } from './suppllier'
import { CTuidSelectManufactor} from './manufactor'
import { CTuidSelectStaff} from './staff'
import { CTuidSelectDepartment} from './department'
import { CTuidSelectGoodslocation} from './goodslocation'
import { CTuidSelectWarehouse} from './warehouse'
import { CTuidSelectLogisticscentre} from './logisticscentre'

const productPackRowContent = observer((values) => {
    let {id, ratio, name, $owner} = values;
    let content, rText = String(ratio);
    if ($owner !== undefined) {
        let packType = $owner.valueFromFieldName('packType');
        if (packType !== undefined) {
            let packName = packType.valueFromFieldName? packType.valueFromFieldName('name') : packType['name'];
            if (packName) {
                if (name) content = name + ' = ' + (rText + packName);
                else content = (rText + packName);
            }
        }
    }
    if (content === undefined) content = (name? name + ' ' + rText : rText) + ' err: no $owner in values';
    return <div className="px-3 py-2">{content}</div>;
});

const product:TuidUI = {
    CTuidMain: CTuidMainProduct,
    CTuidEdit: CTuidEditProduct,
    CTuidSelect: CTuidSelectProduct,
    CTuidList: CTuidListProduct,
    content: (values) => {
        let {id, discription} = values;
        return <>{discription || 'id ' + id + ' ...'}</>;
    },
    rowContent: observer((row):JSX.Element => {
        let {discription, packType} = row;
        let right;
        if (packType && packType.content) {
            right = <Muted>{tv(packType)}</Muted>;
        }
        return <LMR className="px-3 py-2" left={discription} right={right}/>
    }),
    divs: {
        packtype: {
            content: observer((values) => {
                let {id, ratio, name, $owner} = values;
                if ($owner === undefined)
                    return <>{name || ratio || 'id' + id + ' ...'}</>;
                let packType = $owner.valueFromFieldName('packType');
                return <>{name || (ratio + (packType && packType.name)) || 'id' + id + ' ...'}</>;
            }),
            rowContent: productPackRowContent,
        }
    },
    form: {
        items: {
            packType: {
                autoList: true,
            } as FieldTuidUI,
            pack: {
                rowContent: productPackRowContent,
            }
        }
    }
};

const packType:TuidUI = {
    CTuidMain : CTuidMainPackType,
    CTuidSelect : CTuidSelectPackType,
    content: (values) => {
        let {id, name, discription} = values;
        return <>{name || discription || 'id ' + id + ' ...'}</>;
    },
    rowContent: (row):JSX.Element => {
        let {name, discription} = row;
        let right = <Muted>{discription}</Muted>;
        return <LMR className="px-3 py-2" left={name} right={right}/>
    },
    divs: {
        packtype: {
            content: (values) => {
                let {id, name, discription} = values;
                return <>{name || discription || 'id ' + id + ' ...'}</>;
            },
            rowContent: (row):JSX.Element => {
                let {name, discription} = row;
                let right = <Muted>{discription}</Muted>;
                return <LMR className="px-3 py-2" left={name} right={right}/>
            },
        }
    }
};

const customer:TuidUI = {
    CTuidMain: CTuidMainCustomer,
    CTuidSelect: CTuidSelectCustomer,
    CTuidEdit: CTuidEditCustomer,
    CTuidList: CTuidListCustomer,
    content: (values) => {
        let {id, 名称} = values;
        return <>{名称 || 'id ' + id + ' ...'}</>;
    },
    rowContent: (row):JSX.Element => {
        let {名称} = row;
        let right = <Muted>{}</Muted>;
        return <LMR className="px-3 py-2" left={名称} right={right}/>
    },
};

const supplier:TuidUI = {
    CTuidMain: CTuidMainSupplier,
    CTuidSelect: CTuidSelectSupplier,
    CTuidEdit: CTuidEditSupplier,
    CTuidList: CTuidListSupplier,
    content: (values) => {
        let {id, 名称} = values;
        return <>{名称 || 'id ' + id + ' ...'}</>;
    },
    rowContent: (row):JSX.Element => {
        let {名称} = row;
        let right = <Muted>{}</Muted>;
        return <LMR className="px-3 py-2" left={名称} right={right}/>
    },
};

const manufactor:TuidUI = {
    CTuidSelect: CTuidSelectManufactor,
    content: (values) => {
        let {id, 名称} = values;
        return <>{名称 || 'id ' + id + ' ...'}</>;
    },
    rowContent: (row):JSX.Element => {
        let {名称, id} = row;
        let right = <Muted>{}</Muted>;
        let mid = <>{'id ' + id}</>;
        return <LMR className="px-3 py-2" left={名称} right={mid}/>
    },
}

const staff:TuidUI = {
    CTuidSelect: CTuidSelectStaff,
    content: (values) => {
        let {id, 名称} = values;
        return <>{名称 || 'id ' + id + ' ...'}</>;
    },
    rowContent: (row):JSX.Element => {
        let {编码, id} = row;
        let right = <Muted>{}</Muted>;
        let mid = <>{'id ' + id}</>;
        return <LMR className="px-3 py-2" left={编码} right={mid}/>
    },
}

const department:TuidUI = {
    CTuidSelect: CTuidSelectDepartment,
    content: (values) => {
        let {id, 名称} = values;
        return <>{名称 || 'id ' + id + ' ...'}</>;
    },
    rowContent: (row):JSX.Element => {
        let {编码, id} = row;
        let right = <Muted>{}</Muted>;
        let mid = <>{'id ' + id}</>;
        return <LMR className="px-3 py-2" left={编码} right={mid}/>
    },
}

const logisticscentre:TuidUI = {
    CTuidSelect: CTuidSelectLogisticscentre,
    content: (values) => {
        let {id, 编码} = values;
        return <>{编码 || 'id ' + id + ' ...'}</>;
    },
    rowContent: (row):JSX.Element => {
        let {编码, id} = row;
        let right = <Muted>{}</Muted>;
        let mid = <>{'id ' + id}</>;
        return <LMR className="px-3 py-2" left={编码} right={mid}/>
    },
}

const warehouse:TuidUI = {
    CTuidSelect: CTuidSelectWarehouse,
    content: (values) => {
        let {id, 编码} = values;
        return <>{编码 || 'id ' + id + ' ...'}</>;
    },
    rowContent: (row):JSX.Element => {
        let {编码, id} = row;
        let right = <Muted>{}</Muted>;
        let mid = <>{'id ' + id}</>;
        return <LMR className="px-3 py-2" left={编码} right={mid}/>
    },
}

const goodslocation:TuidUI = {
    CTuidSelect: CTuidSelectGoodslocation,
    content: (values) => {
        let {id, 名称} = values;
        return <>{名称 || 'id ' + id + ' ...'}</>;
    },
    rowContent: (row):JSX.Element => {
        let {名称, id} = row;
        let right = <Muted>{}</Muted>;
        let mid = <>{'id ' + id}</>;
        return <LMR className="px-3 py-2" left={名称} right={mid}/>
    },
}

export default {
    product: product,
    packType: packType,
    生产厂商: manufactor,
    客户信息: customer,
    供应商信息: supplier,
    职员信息:staff,
    部门信息: department,
    物流中心:logisticscentre,
    货位信息:goodslocation,
    库区信息:warehouse,
}
