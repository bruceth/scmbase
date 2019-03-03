import * as React from 'react';
import { Page, nav } from 'tonva-tools';

export class About extends React.Component {
    private showLogs = () => {
        nav.push(<Page header="Logs">
            <div>NODE_ENV: {process.env.NODE_ENV}</div>
            {nav.logs.map((v,i) => {
                return <div key={i} className="px-3 py-1">{v}</div>;
            })}
        </Page>);
    }

    render() {
        let right = <button className='btn btn-success btn-sm' onClick={this.showLogs}>log</button>;
        return <Page header="关于SCM" right={right}>
            <div className='m-3'>
                SCM
            </div>
        </Page>;
    }
}