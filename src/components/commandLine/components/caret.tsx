import * as React from 'react';
import {ICaretOwnProps, ICaretState} from './caret.interface';

import * as styles from './caret.style';

export class Caret extends React.Component<ICaretOwnProps, ICaretState> {
    public state: ICaretState = {
        blinked: false,
    };
    private interval: any;

    public render() {
        const {commandString, caretPosition} = this.props;

        const caretSymbol = commandString[caretPosition] === undefined
            ? 'C'
            : <span style={styles.caretCaretWithSymbol}>{commandString[caretPosition]}</span>;

        return (
            <span key={'caret'} style={this.getCaretStyles()}>{caretSymbol}</span>
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

    private getCaretStyles(): React.CSSProperties {
        return this.state.blinked
            ? styles.caretCaretBlinked
            : styles.caretCaret;
    }
}
