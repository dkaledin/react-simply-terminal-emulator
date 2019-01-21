export interface ITerminalOwnProps {
    history: string[];
    prompt: string;
    terminalEmulator: {
        execute: (command: string, setState: SetState) => void;
    };
}
export interface ITerminalState {
    history: string[];
    prompt: string;
}
declare type SetState = (prevState: (state: ITerminalState, props: ITerminalOwnProps) => ITerminalState) => void;
export {};
