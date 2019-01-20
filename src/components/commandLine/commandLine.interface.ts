export interface ICommandLineOwnProps {
    prompt: string;
    onReceiveCommand: (commandString: string) => void;
}

export interface ICommandLineState {
    commandString: string;
    caretPosition: number;
}
