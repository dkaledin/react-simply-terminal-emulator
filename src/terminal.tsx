import * as React from 'react';
import {CommandLine} from './commandLine/commandLine';
import './terminal.css';
import {BasicEmulator, CommandExecutor} from './helper/emulator';

interface ITerminalOwnProps {
    history: string[];
    onReceiveCommand?: (command: string) => void;
    prompt: string;
}

interface ITerminalState {
    history: string[];
}

export class Terminal extends React.Component<ITerminalOwnProps, ITerminalState> {
    public static defaultProps: ITerminalOwnProps = {
        history: [],
        prompt: '$',
    };

    public state: ITerminalState = {
        history: this.props.history,
    };

    private readonly executor: CommandExecutor;

    constructor(props: ITerminalOwnProps) {
        super(props);

        this.executor = BasicEmulator;
    }

    public render() {
        return (
            <div className="terminal__box">
                <div className="terminal__container">
                    {this.state.history.map((line, index) =>
                        <div key={index}>{line}</div>)}
                    <CommandLine onReceiveCommand={this.handleReceiveCommand} prompt={this.props.prompt}/>
                </div>
            </div>
        );
    }

    private handleReceiveCommand = (command: string) => this.setState(this.executor(command));
}
