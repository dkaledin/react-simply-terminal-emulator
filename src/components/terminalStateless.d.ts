/// <reference types="react" />
import './terminalStateless.css';
export interface ITerminalStatelessProps {
    history: string[];
    prompt: string;
    onReceiveCommand: (command: string) => void;
}
export declare function TerminalStateless(props: ITerminalStatelessProps): JSX.Element;
