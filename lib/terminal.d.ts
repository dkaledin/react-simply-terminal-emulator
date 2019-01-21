import * as React from 'react';
import { ITerminalOwnProps, ITerminalState } from './terminal.interface';
export declare class Terminal extends React.Component<ITerminalOwnProps, ITerminalState> {
    static defaultProps: Pick<ITerminalOwnProps, 'history' | 'prompt'>;
    state: ITerminalState;
    render(): JSX.Element;
    private handleReceiveCommand;
}
