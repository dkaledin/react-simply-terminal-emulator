import * as React from 'react';
import {ICaretOwnProps, ICaretState} from './caret.interface';

import './caret.css';

export class Caret extends React.Component<ICaretOwnProps, ICaretState> {
    public state: ICaretState = {
        blinked: false,
    };
    private interval: any;

    public render() {
        const {commandString, caretPosition} = this.props;

        const caretSymbol = commandString[caretPosition] === undefined
            ? 'C'
            : <span className="caret__caret-with-symbol">{commandString[caretPosition]}</span>;

        return (
            <span key={'caret'} className={this.getCaretStyles()}>{caretSymbol}</span>
        );
    }

    public componentDidMount(): void {
        this.interval = setInterval(() => {
            this.setState({
                blinked: !this.state.blinked,
            });
        }, 550);
    }

    public componentWillUnmount(): void {
        clearInterval(this.interval);
    }

    private getCaretStyles() {
        return this.state.blinked
            ? 'caret__caret-blinked'
            : 'caret__caret';
    }
}
