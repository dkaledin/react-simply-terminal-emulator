import * as React from 'react';
import { ICommandLineOwnProps, ICommandLineState } from './commandLine.interface';
export declare class CommandLine extends React.Component<ICommandLineOwnProps, ICommandLineState> {
    state: ICommandLineState;
    private inputRef;
    private interval;
    private keyboardEvents;
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private handleInputChange;
    private handleSelect;
    private renderCommandLive;
    private updateCaretPosition;
    private handleEnterKeyPress;
}
