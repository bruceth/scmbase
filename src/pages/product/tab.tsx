import * as React from 'react';
import Loadable from 'react-loadable';
import { nav, Page, Loading } from 'tonva-tools';
import { List, SearchBox } from 'tonva-react-form';
import logo from 'logo.svg';

const aContent = (param:any) => {
    let products = [
        {id: 1, discription: '水', price: 2.5},
        {id: 2, discription: '盐', price: 30.99},
    ]

    function renderRow(item, index) {
        let {id, discription, price} = item;
        return <div className="px-3 py-3 d-flex flex-column">
            <div>{id} {discription} </div>
            <div className="d-flex">
                <div className="flex-grow-1"><span className="text-danger font-weight-bold">{price}</span> <small>元</small></div>
                <div><button className="btn btn-outline-danger btn-sm">加购物车</button></div>
            </div>
        </div>
    }

    function onClick(item) {
        let {id, discription} = item;
        nav.push(<Page header={discription}>
            <div>{id}</div>
            <div>{discription}</div>
            <div><button className="btn btn-danger btn-block">选购</button></div>
        </Page>);
    }

    return <div>
        
        <List items={products} item={{render:renderRow, onClick:onClick}} />
        afa af asfd <br/>
        afa af asfd <br/>
        afa af asfd <br/>
    </div>;
}

export default aContent;