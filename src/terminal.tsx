import * as React from 'react';
import {TerminalStateless} from './components/terminalStateless';
import {ITerminalOwnProps, ITerminalState} from './terminal.interface';
import {terminalEmulator} from './terminalEmulator/terminalEmulator';

export class Terminal extends React.Component<ITerminalOwnProps, ITerminalState> {
    public static defaultProps: ITerminalOwnProps = {
        history: [],
        prompt: '$',
    };

    public state: ITerminalState = {
        history: this.props.history,
        prompt: this.props.prompt,
    };

    public render() {
        const {history, prompt} = this.state;
        return (
            <TerminalStateless
                history={history}
                prompt={prompt}
                onReceiveCommand={this.handleReceiveCommand}
            />
        );
    }

    private handleReceiveCommand = (command: string) => {
        terminalEmulator.execute(command, this.setState.bind(this));
    };
}
