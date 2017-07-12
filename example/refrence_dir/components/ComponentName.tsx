
/**
*Created by Vikas Sarkar
*Date : 2017-07-07
*/

import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface IComponentNameProps {
    compiler: string;
    framework: string;
}

export class ComponentName extends React.Component<IComponentNameProps, undefined> {

    render (): React.ReactElement<IComponentNameProps> {
        
        return (
            <h1> its ComponentName component build by {this.props.compiler} and {this.props.framework}!!</h1>
        );
    }
}