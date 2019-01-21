import * as React from 'react';
import {CommandLine} from './commandLine/commandLine';
import {ITerminalStatelessProps} from './terminalStateless.interface';
import * as styles from './terminalStateless.style';

export function TerminalStateless(props: ITerminalStatelessProps) {
    const {history, prompt, onReceiveCommand} = props;

    return (
        <div style={styles.terminalBox}>
            <div style={styles.terminalContainer}>
                {history.map((line, index) =>
                    <div key={index}>{line}</div>)}
                <CommandLine onReceiveCommand={onReceiveCommand} prompt={prompt}/>
            </div>
        </div>
    );
}
