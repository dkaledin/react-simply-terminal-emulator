export interface ITerminalOwnProps {
    history: string[];
    onReceiveCommand?: (command: string) => void;
    prompt: string;
}

export interface ITerminalState {
    history: string[];
    prompt: string;
}
