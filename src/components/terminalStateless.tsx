import * as React from 'react';
import {CommandLine} from './commandLine/commandLine';
import './terminalStateless.css';

export interface ITerminalStatelessProps {
    history: string[];
    prompt: string;
    onReceiveCommand: (command: string) => void;
}

export function TerminalStateless(props: ITerminalStatelessProps) {
    const {history, prompt, onReceiveCommand} = props;

    return (
        <div className="terminal__box">
            <div className="terminal__container">
                {history.map((line, index) =>
                    <div key={index}>{line}</div>)}
                <CommandLine onReceiveCommand={onReceiveCommand} prompt={prompt}/>
            </div>
        </div>
    );
}
