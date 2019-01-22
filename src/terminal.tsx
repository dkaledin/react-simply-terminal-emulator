import * as React from 'react';
import {TerminalStateless} from './components/terminalStateless';
import {ITerminalOwnProps, ITerminalState} from './terminal.interface';

export class Terminal extends React.Component<ITerminalOwnProps, ITerminalState> {
    public static defaultProps: Pick<ITerminalOwnProps, 'history' | 'prompt'> = {
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
        this.setState(prevState => ({
            history: [
                ...prevState.history,
                `${prevState.prompt} ${command}`,
            ],
        }), () => {
            this.props.terminalEmulator.execute(command, this.setState.bind(this));
        });
    };
}
