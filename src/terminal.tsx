import * as React from 'react';
import {CommandLine} from './commandLine/commandLine';
import './terminal.css';

interface ITerminalOwnProps {
}

interface ITerminalState {
    history: string[];
}

export class Terminal extends React.Component<ITerminalOwnProps, ITerminalState> {
    public state: ITerminalState = {
        history: [],
    };

    private prompt = '$';

    public render() {
        return (
            <div className="terminal__box">
                <div className="terminal__container">
                    {this.state.history.map((line, index) => <div key={index}>{line}</div>)}
                    <CommandLine onSubmit={this.handleSubmit} prompt={this.prompt}/>
                </div>
            </div>
        );
    }

    private handleSubmit = (command: string) => {
        const commandLine = `${this.prompt} ${command}`;

        if (command === 'clear') {
            this.setState({
                history: [],
            });
        } else {
            this.setState({
                history: [...this.state.history, commandLine],
            });
        }
    };
}
