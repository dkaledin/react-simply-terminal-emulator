export interface ICommandExecutorFactoryParams {
    commandList: IEmulatorCommand;
}
export declare type StateUpdater = (state: ICommandExecutorState, props: ICommandExecutorProps) => ICommandExecutorState;
export interface ICommandExecutorState {
    history: string[];
}
export interface ICommandExecutorProps {
    prompt: string;
}
export interface IEmulatorCommand {
    [key: string]: StateUpdater;
}
export declare type CommandExecutor = (command: string) => StateUpdater;
export declare const BasicEmulator: CommandExecutor;
