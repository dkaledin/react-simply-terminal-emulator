export interface ICommandLineOwnProps {
    prompt: string;
    onSubmit: (commandString: string) => void;
}
export interface ICommandLineState {
    commandString: string;
    caretPosition: number;
}
