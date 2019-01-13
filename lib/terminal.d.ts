import * as React from 'react';
import './terminal.css';
interface ITerminalOwnProps {
}
interface ITerminalState {
    history: string[];
}
export declare class Terminal extends React.Component<ITerminalOwnProps, ITerminalState> {
    state: ITerminalState;
    private prompt;
    render(): JSX.Element;
    private handleSubmit;
}
export {};
