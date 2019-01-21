import * as React from 'react';
import { ICaretOwnProps, ICaretState } from './caret.interface';
export declare class Caret extends React.Component<ICaretOwnProps, ICaretState> {
    state: ICaretState;
    private interval;
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private getCaretStyles;
}
