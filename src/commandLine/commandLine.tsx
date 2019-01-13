import * as React from 'react';
import {
    ICommandLineOwnProps,
    ICommandLineState,
} from './commandLine.interface';
import {Caret} from './components/caret';

import './commandLine.css';

export class CommandLine extends React.Component<ICommandLineOwnProps, ICommandLineState> {
    public state: ICommandLineState = {
        commandString: '',
        caretPosition: 0,
    };
    private inputRef = React.createRef<HTMLInputElement>();
    private interval: any;
    private keyboardEvents = ['keyup', 'keydown', 'keypress'];

    public render() {
        const {prompt} = this.props;

        return (
            <div>
                <span>{prompt} </span>
                {this.renderCommandLive()}
                <input
                    type="text"
                    className="command-line__input"
                    onChange={this.handleInputChange}
                    autoFocus={true}
                    ref={this.inputRef}
                    onSelect={this.handleSelect}
                    value={this.state.commandString}
                />
            </div>
        );
    }

    public componentDidMount(): void {
        this.interval = setInterval(
            () => this.inputRef.current!.focus(),
            500,
        );

        this.keyboardEvents.map(eventName =>
            document.addEventListener(eventName, this.updateCaretPosition),
        );

        document.addEventListener('keypress', this.handleEnterKeyPress);
    }

    public componentWillUnmount(): void {
        clearInterval(this.interval);
        this.keyboardEvents.map(eventName =>
            document.removeEventListener(eventName, this.updateCaretPosition),
        );

        document.removeEventListener('keyPress', this.handleEnterKeyPress);
    }

    private handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;

        this.setState({
            commandString: value,
        });

        this.updateCaretPosition();
    };

    private handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.selectionStart = event.target.selectionEnd;
    };

    private renderCommandLive = () => {
        const {commandString, caretPosition} = this.state;
        const commandStringWithCaret: Array<string | JSX.Element> = commandString.split('');

        commandStringWithCaret.splice(
            this.state.caretPosition,
            1,
            <Caret key={'caret'} commandString={commandString} caretPosition={caretPosition}/>,
        );

        return commandStringWithCaret;
    };

    private updateCaretPosition = () => {
        const newCaretPosition = this.inputRef.current!.selectionStart;

        this.setState({
            caretPosition: Number(newCaretPosition),
        });
    };

    private handleEnterKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            this.props.onSubmit(this.state.commandString);
            this.setState({
                commandString: '',
                caretPosition: 0,
            });
        }
    };
}
