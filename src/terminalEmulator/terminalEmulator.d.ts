import { ICommandExecutor, SetState } from './terminalEmulator.interface';
export declare class TerminalEmulator {
    private command;
    private readonly executors;
    private ranExecutor;
    constructor(params: ICommandExecutor);
    execute(command: string, setState: SetState): void;
    private errorExecutor;
    private emptyExecutor;
}
export declare const terminalEmulator: TerminalEmulator;
