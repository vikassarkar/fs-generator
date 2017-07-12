/**
*Created by Vikas Sarkar
*Date : 2017-07-07
*/

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';

import { ComponentName } from './components/ComponentName';

import './styles/main.scss';

export class WidgetName extends React.Component<undefined, undefined> {

    render(): React.ReactElement<undefined> {
        return (
            <div>
                <ComponentName framework="React" compiler="TypeScript" />
            </div>
        );
    }
}