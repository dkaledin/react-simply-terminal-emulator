import * as React from 'react';
import './terminal.css';
interface ITerminalOwnProps {
    history: string[];
    onReceiveCommand?: (command: string) => void;
    prompt: string;
}
interface ITerminalState {
    history: string[];
}
export declare class Terminal extends React.Component<ITerminalOwnProps, ITerminalState> {
    static defaultProps: ITerminalOwnProps;
    state: ITerminalState;
    private readonly executor;
    constructor(props: ITerminalOwnProps);
    render(): JSX.Element;
    private handleReceiveCommand;
}
export {};
