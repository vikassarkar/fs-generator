/**
*Created by Vikas Sarkar
*Date : 2017-07-07
*/

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';

import { WidgetName } from '../WidgetName';

import '../../../assets/styles/global.scss';

class App extends React.Component<undefined, undefined> {

    render(): React.ReactElement<undefined> {
        return (
            <div>
                <WidgetName />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);