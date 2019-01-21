import * as React from 'react';
import { CommandLine } from './commandLine/commandLine';
import * as styles from './terminalStateless.style';
export function TerminalStateless(props) {
    var history = props.history, prompt = props.prompt, onReceiveCommand = props.onReceiveCommand;
    return (React.createElement("div", { style: styles.terminalBox },
        React.createElement("div", { style: styles.terminalContainer },
            history.map(function (line, index) {
                return React.createElement("div", { key: index }, line);
            }),
            React.createElement(CommandLine, { onReceiveCommand: onReceiveCommand, prompt: prompt }))));
}
