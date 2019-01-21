import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {terminalEmulator} from '../src/terminalEmulator/terminalEmulator';
import {Terminal} from '../src/terminal';
import './index.css';

ReactDOM.render(
    <Terminal
        terminalEmulator={terminalEmulator}
    />,
    document.getElementById('root') as HTMLElement,
);
