export interface ITerminalOwnProps {
    history: string[];
    prompt: string;
    terminalEmulator: {
        execute: (command: string, setState: SetState) => void;
    };
    height?: string;
    width?: string;
}

export interface ITerminalState {
    history: string[];
    prompt: string;
}

type SetState = (prevState: (state: ITerminalState, props: ITerminalOwnProps) => ITerminalState) => void;
