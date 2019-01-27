export interface ITerminalStatelessProps {
    history: string[];
    prompt: string;
    onReceiveCommand: (command: string) => void;
    height?: string;
    width?: string;
}
